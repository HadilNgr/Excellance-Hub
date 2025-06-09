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
include_once '../models/Admin.php';

// --- INIT ---
$database = new Database();
$db = $database->getConnection();
$admin = new Admin($db);

// --- READ INPUT ---
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->full_name, $data->email, $data->password) &&
    !empty($data->full_name) &&
    !empty($data->email) &&
    !empty($data->password)
) {
    // --- CHECK EXISTING EMAIL ---
    if ($admin->emailExists($data->email)) {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "Email already exists"]);
        return;
    }

    // --- REGISTER ADMIN ---
    $admin->full_name = $data->full_name;
    $admin->email = $data->email;
    $admin->password = $data->password;

    if ($admin->register()) {
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "admin" => [
                "id" => $admin->id,
                "full_name" => $admin->full_name,
                "email" => $admin->email
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
