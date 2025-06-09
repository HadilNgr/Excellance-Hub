<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Announcement.php';

$database = new Database();
$db = $database->getConnection();

$announcement = new Announcement($db);

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    
    if($id) {
        $announcement_data = $announcement->getById($id);
        if($announcement_data) {
            http_response_code(200);
            echo json_encode($announcement_data);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Announcement not found"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Announcement ID is required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>