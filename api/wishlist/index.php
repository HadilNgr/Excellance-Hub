<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Wishlist.php';

$database = new Database();
$db = $database->getConnection();

$wishlist = new Wishlist($db);

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $wishlists = $wishlist->getAll();
    http_response_code(200);
    echo json_encode($wishlists);
} elseif($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->student_id) && !empty($data->project_id)) {
        $wishlist->student_id = $data->student_id;
        $wishlist->project_id = $data->project_id;
        
        if($wishlist->add()) {
            http_response_code(201);
            echo json_encode(array(
                "status" => "success",
                "wishlist" => array(
                    "id" => $wishlist->id,
                    "student_id" => $wishlist->student_id,
                    "project_id" => $wishlist->project_id
                )
            ));
        } else {
            http_response_code(409);
            echo json_encode(array("message" => "Already wishlisted"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Student ID and Project ID are required"));
    }
} elseif($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->student_id) && !empty($data->project_id)) {
        $wishlist->student_id = $data->student_id;
        $wishlist->project_id = $data->project_id;
        
        if($wishlist->remove()) {
            http_response_code(200);
            echo json_encode(array(
                "status" => "success",
                "message" => "Removed from wishlist"
            ));
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Wishlist item not found"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Student ID and Project ID are required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>