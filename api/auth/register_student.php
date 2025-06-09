<?php
// --- HEADERS ---
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- INCLUDES ---
include_once '../config/database.php';
include_once '../models/Student.php';

// --- INIT ---
$database = new Database();
$db = $database->getConnection();
$student = new Student($db);

// --- READ INPUT ---
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->first_name, $data->last_name, $data->email, $data->password) &&
    !empty($data->first_name) &&
    !empty($data->last_name) &&
    !empty($data->email) &&
    !empty($data->password)
) {
    // --- CHECK EXISTING EMAIL ---
    if ($student->emailExists($data->email)) {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "Email already exists"]);
        return;
    }

    // --- REGISTER STUDENT ---
    $student->first_name = $data->first_name;
    $student->last_name = $data->last_name;
    $student->email = $data->email;
    $student->password = $data->password;

    if ($student->register()) {
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "student" => [
                "id" => $student->id,
                "first_name" => $student->first_name,
                "last_name" => $student->last_name,
                "email" => $student->email
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Registration failed"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
}
?>
