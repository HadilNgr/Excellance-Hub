<?php
class Wishlist {
    private $conn;
    private $table_name = "student_project_wishlist";

    public $id;
    public $student_id;
    public $project_id;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function add() {
        // Check if already exists
        if($this->exists()) {
            return false;
        }

        $query = "INSERT INTO " . $this->table_name . " (student_id, project_id) VALUES (:student_id, :project_id)";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':student_id', $this->student_id);
        $stmt->bindParam(':project_id', $this->project_id);
        
        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function remove() {
        $query = "DELETE FROM " . $this->table_name . " WHERE student_id = :student_id AND project_id = :project_id";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':student_id', $this->student_id);
        $stmt->bindParam(':project_id', $this->project_id);
        
        return $stmt->execute();
    }

    public function getByStudent($student_id) {
        $query = "SELECT w.id, w.student_id, w.project_id,
                  JSON_OBJECT(
                      'id', p.id,
                      'title', p.title,
                      'description', p.description
                  ) as project
                  FROM " . $this->table_name . " w
                  JOIN projects p ON w.project_id = p.id
                  WHERE w.student_id = :student_id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':student_id', $student_id);
        $stmt->execute();
        
        $results = $stmt->fetchAll();
        
        // Decode JSON project data
        foreach($results as &$result) {
            $result['project'] = json_decode($result['project'], true);
        }
        
        return $results;
    }

    public function getAll() {
        $query = "SELECT w.id, w.student_id, w.project_id,
                  JSON_OBJECT(
                      'id', s.id,
                      'first_name', s.first_name,
                      'last_name', s.last_name,
                      'email', s.email
                  ) as student,
                  JSON_OBJECT(
                      'id', p.id,
                      'title', p.title,
                      'description', p.description
                  ) as project
                  FROM " . $this->table_name . " w
                  JOIN students s ON w.student_id = s.id
                  JOIN projects p ON w.project_id = p.id";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        $results = $stmt->fetchAll();
        
        // Decode JSON data
        foreach($results as &$result) {
            $result['student'] = json_decode($result['student'], true);
            $result['project'] = json_decode($result['project'], true);
        }
        
        return $results;
    }

    public function exists() {
        $query = "SELECT id FROM " . $this->table_name . " WHERE student_id = :student_id AND project_id = :project_id LIMIT 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':student_id', $this->student_id);
        $stmt->bindParam(':project_id', $this->project_id);
        $stmt->execute();
        
        return $stmt->rowCount() > 0;
    }
}
?>