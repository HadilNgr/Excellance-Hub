<?php
include_once '../config/cors.php';
include_once '../config/database.php';
include_once '../models/Wishlist.php';

$database = new Database();
$db = $database->getConnection();

$wishlist = new Wishlist($db);

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $student_id = isset($_GET['student_id']) ? $_GET['student_id'] : null;
    
    if($student_id) {
        $wishlist_items = $wishlist->getByStudent($student_id);
        http_response_code(200);
        echo json_encode($wishlist_items);
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Student ID is required"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
}
?>