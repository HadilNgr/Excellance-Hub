<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Announcement.php';

$database = new Database();
$db = $database->getConnection();

$announcement = new Announcement($db);

if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    
    if($id) {
        if($announcement->delete($id)) {
            http_response_code(200);
            echo json_encode(array(
                "status" => "success",
                "message" => "Announcement deleted"
            ));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Delete failed"));
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