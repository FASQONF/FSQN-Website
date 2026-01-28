<?php
$base = realpath(__DIR__ . "/..");
$file = $base . "/data/waitlist.csv";

if (!is_file($file)) {
  http_response_code(404);
  echo "Not found";
  exit;
}

header("Content-Type: text/csv; charset=UTF-8");
header('Content-Disposition: attachment; filename="waitlist.csv"');
header("Cache-Control: no-store");
header("Pragma: no-cache");

readfile($file);
