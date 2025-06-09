<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Announcement.php';

$database = new Database();
$db = $database->getConnection();

$announcement = new Announcement($db);

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $display = isset($_GET['display']) ? $_GET['display'] : null;
    $announcements = $announcement->getAll($display);
    http_response_code(200);
    echo json_encode($announcements);
} elseif($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->title) && !empty($data->content) && !empty($data->display) && !empty($data->datetime)) {
        $announcement->title = $data->title;
        $announcement->content = $data->content;
        $announcement->display = $data->display;
        $announcement->datetime = $data->datetime;
        
        if($announcement->create()) {
            http_response_code(201);
            echo json_encode(array(
                "status" => "success",
                "announcement" => array(
                    "id" => $announcement->id,
                    "title" => $announcement->title,
                    "content" => $announcement->content,
                    "display" => $announcement->display,
                    "datetime" => $announcement->datetime
                )
            ));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Announcement creation failed"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "All fields are required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>