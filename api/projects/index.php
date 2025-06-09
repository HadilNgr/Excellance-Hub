<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Project.php';

$database = new Database();
$db = $database->getConnection();

$project = new Project($db);

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $projects = $project->getAll();
    http_response_code(200);
    echo json_encode($projects);
} elseif($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->title) && !empty($data->description)) {
        $project->title = $data->title;
        $project->description = $data->description;
        
        if($project->create()) {
            http_response_code(201);
            echo json_encode(array(
                "status" => "success",
                "project" => array(
                    "id" => $project->id,
                    "title" => $project->title,
                    "description" => $project->description
                )
            ));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Project creation failed"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Title and description are required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>