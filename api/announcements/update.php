<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Announcement.php';

$database = new Database();
$db = $database->getConnection();

$announcement = new Announcement($db);

if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    
    if($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        // Get existing announcement
        $existing = $announcement->getById($id);
        if(!$existing) {
            http_response_code(404);
            echo json_encode(array("message" => "Announcement not found"));
            exit;
        }
        
        // Update fields
        $announcement->title = isset($data->title) ? $data->title : $existing['title'];
        $announcement->content = isset($data->content) ? $data->content : $existing['content'];
        $announcement->display = isset($data->display) ? $data->display : $existing['display'];
        $announcement->datetime = isset($data->datetime) ? $data->datetime : $existing['datetime'];
        
        if($announcement->update($id)) {
            http_response_code(200);
            echo json_encode(array(
                "status" => "success",
                "announcement" => array(
                    "id" => $id,
                    "title" => $announcement->title,
                    "content" => $announcement->content,
                    "display" => $announcement->display,
                    "datetime" => $announcement->datetime
                )
            ));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Update failed"));
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