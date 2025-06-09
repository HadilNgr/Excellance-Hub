<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Student.php';

$database = new Database();
$db = $database->getConnection();

$student = new Student($db);

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    
    if($id) {
        $student_data = $student->getById($id);
        if($student_data) {
            http_response_code(200);
            echo json_encode($student_data);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Student not found"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Student ID is required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>