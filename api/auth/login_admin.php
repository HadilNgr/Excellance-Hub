<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Admin.php';

$database = new Database();
$db = $database->getConnection();

$admin = new Admin($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->password)) {
    if($admin->login($data->email, $data->password)) {
        http_response_code(200);
        echo json_encode(array(
            "id" => $admin->id,
            "full_name" => $admin->full_name,
            "email" => $admin->email
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