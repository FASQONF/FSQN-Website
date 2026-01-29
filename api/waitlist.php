<?php
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

// rate limiting

$RATE_LIMIT_MAX = 4;
$RATE_LIMIT_WINDOW = 120;

$ip =
  $_SERVER['HTTP_CF_CONNECTING_IP']
  ?? ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')
  ?: $_SERVER['REMOTE_ADDR']
  ?: 'unknown';

$baseDataDir = realpath(__DIR__ . '/../_data') ?: (__DIR__ . '/../_data');
if (!is_dir($baseDataDir)) @mkdir($baseDataDir, 0755, true);

$rateDir = $baseDataDir . '/ratelimit';
if (!is_dir($rateDir)) @mkdir($rateDir, 0755, true);

$key = sha1($ip);
$rateFile = $rateDir . '/' . $key . '.json';
$now = time();

$data = ['hits' => []];

if (is_file($rateFile)) {
  $json = file_get_contents($rateFile);
  $decoded = json_decode($json, true);
  if (is_array($decoded)) {
    $data = $decoded;
  }
}

$data['hits'] = array_values(array_filter(
  $data['hits'],
  fn($ts) => ($now - $ts) < $RATE_LIMIT_WINDOW
));

if (count($data['hits']) >= $RATE_LIMIT_MAX) {
  $retryAfter = $RATE_LIMIT_WINDOW - ($now - $data['hits'][0]);

  http_response_code(429);
  header('Retry-After: ' . max(1, $retryAfter));
  echo json_encode([
    'ok' => false,
    'error' => 'Too many requests. Try again later.'
  ]);
  exit;
}

$data['hits'][] = $now;
file_put_contents($rateFile, json_encode($data), LOCK_EX);

// main logic

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!is_array($body)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

$name = trim((string)($body['name'] ?? ''));
$email = strtolower(trim((string)($body['email'] ?? '')));
$waitlist = (bool)($body['waitlist'] ?? false);
$subscribe = (bool)($body['subscribe'] ?? false);

if ($name === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Name is required.']);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Valid email is required.']);
  exit;
}

$csvPath = $baseDataDir . '/waitlist.csv';

$fp = fopen($csvPath, 'c+');
if (!$fp) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Cannot open storage']);
  exit;
}

if (!flock($fp, LOCK_EX)) {
  fclose($fp);
  http_response_code(503);
  echo json_encode(['ok' => false, 'error' => 'Busy. Try again.']);
  exit;
}

$HEADER = "name,mail,waitlist,subscribe,time";

$contents = stream_get_contents($fp);
$lines = preg_split("/\r\n|\n|\r/", $contents);

$first = strtolower(trim($lines[0] ?? ''));
$hasHeader = ($first === $HEADER);

$dataLines = $hasHeader ? array_slice($lines, 1) : $lines;
$dataLines = array_values(array_filter(array_map('trim', $dataLines), fn($l) => $l !== ''));

$now = gmdate('c');

$csvEscape = function($v) {
  $s = (string)$v;
  if (preg_match('/[",\r\n]/', $s)) return '"' . str_replace('"', '""', $s) . '"';
  return $s;
};

$newRow =
  $csvEscape($name) . ',' .
  $csvEscape($email) . ',' .
  ($waitlist ? 'true' : 'false') . ',' .
  ($subscribe ? 'true' : 'false') . ',' .
  $csvEscape($now);

$replaced = false;
$nextLines = [];

foreach ($dataLines as $line) {
  $cols = str_getcsv($line);
  $existingEmail = strtolower(trim((string)($cols[1] ?? '')));
  if ($existingEmail !== '' && $existingEmail === $email) {
    $replaced = true;
    $nextLines[] = $newRow;
  } else {
    $nextLines[] = $line;
  }
}

if (!$replaced) $nextLines[] = $newRow;

rewind($fp);
ftruncate($fp, 0);
fwrite($fp, $HEADER . "\n" . implode("\n", $nextLines) . "\n");
fflush($fp);

flock($fp, LOCK_UN);
fclose($fp);

echo json_encode(['ok' => true, 'updated' => $replaced]);
