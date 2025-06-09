<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Admin.php';

$database = new Database();
$db = $database->getConnection();

$admin = new Admin($db);

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $admins = $admin->getAll();
    http_response_code(200);
    echo json_encode($admins);
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>