<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Student.php';

$database = new Database();
$db = $database->getConnection();

$student = new Student($db);

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $students = $student->getAll();
    http_response_code(200);
    echo json_encode($students);
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>