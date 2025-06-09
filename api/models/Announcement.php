<?php
class Announcement {
    private $conn;
    private $table_name = "announcements";

    public $id;
    public $title;
    public $content;
    public $display;
    public $datetime;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($display = null) {
        $query = "SELECT id, title, content, display, datetime FROM " . $this->table_name;
        
        if($display) {
            $query .= " WHERE display = :display";
        }
        
        $query .= " ORDER BY datetime DESC";
        
        $stmt = $this->conn->prepare($query);
        
        if($display) {
            $stmt->bindParam(':display', $display);
        }
        
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (title, content, display, datetime) VALUES (:title, :content, :display, :datetime)";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':display', $this->display);
        $stmt->bindParam(':datetime', $this->datetime);
        
        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function getById($id) {
        $query = "SELECT id, title, content, display, datetime FROM " . $this->table_name . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function update($id) {
        $query = "UPDATE " . $this->table_name . " SET title = :title, content = :content, display = :display, datetime = :datetime WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':display', $this->display);
        $stmt->bindParam(':datetime', $this->datetime);
        
        return $stmt->execute();
    }

    public function delete($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?>