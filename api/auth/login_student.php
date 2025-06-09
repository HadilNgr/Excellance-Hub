<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Student.php';

$database = new Database();
$db = $database->getConnection();

$student = new Student($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->password)) {
    if($student->login($data->email, $data->password)) {
        http_response_code(200);
        echo json_encode(array(
            "id" => $student->id,
            "first_name" => $student->first_name,
            "last_name" => $student->last_name,
            "email" => $student->email
        ));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid credentials"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Email and password are required"));
}
?>