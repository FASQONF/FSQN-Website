<?php
$secretsPath = __DIR__ . '/_secrets.php';
$secrets = is_file($secretsPath) ? require $secretsPath : [];

$SECRET =
  ($secrets['WAITLIST_ADMIN_KEY'] ?? null)
  ?: (getenv('WAITLIST_ADMIN_KEY') ?: null)
  ?: 'TEMP_ADMIN_WAITLIST_KEY';

if (!isset($_SERVER['PHP_AUTH_PW']) || !hash_equals($SECRET, $_SERVER['PHP_AUTH_PW'])) {
  header('WWW-Authenticate: Basic realm="Waitlist Export"');
  header('HTTP/1.0 401 Unauthorized');
  echo 'Unauthorized';
  exit;
}

$dataDir = realpath(__DIR__ . '/../_data') ?: (__DIR__ . '/../_data');
$file = $dataDir . '/waitlist.csv';

if (!is_file($file)) {
  http_response_code(404);
  echo 'Not found';
  exit;
}

header('Content-Type: text/csv; charset=UTF-8');
header('Content-Disposition: attachment; filename="waitlist.csv"');
header('Cache-Control: no-store');
header('Pragma: no-cache');

readfile($file);
