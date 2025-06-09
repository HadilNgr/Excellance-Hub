<?php
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    // Create test students
    $stmt = $db->prepare("INSERT INTO students (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
    
    $students = [
        ['John', 'Doe', 'student@example.com', password_hash('password123', PASSWORD_DEFAULT)],
        ['Jane', 'Smith', 'jane@example.com', password_hash('password123', PASSWORD_DEFAULT)]
    ];
    
    foreach($students as $student) {
        $stmt->execute($student);
    }
    
    // Create test admin
    $stmt = $db->prepare("INSERT INTO admins (full_name, email, password) VALUES (?, ?, ?)");
    $stmt->execute(['Admin User', 'admin@example.com', password_hash('admin123', PASSWORD_DEFAULT)]);
    
    // Create test projects
    $stmt = $db->prepare("INSERT INTO projects (title, description) VALUES (?, ?)");
    
    $projects = [
        ['AI-Powered Student Performance Analytics', 'Develop a machine learning system to analyze and predict student performance patterns using historical data.'],
        ['Smart Campus Navigation System', 'Create a mobile application that uses AR and GPS to help students navigate the campus efficiently.'],
        ['Blockchain-Based Certificate Verification', 'Design a secure system for issuing and verifying academic certificates using blockchain technology.'],
        ['IoT-Based Environmental Monitoring', 'Build an IoT system to monitor air quality, temperature, and humidity across campus buildings.'],
        ['Virtual Reality Learning Platform', 'Develop a VR application for immersive learning experiences in various subjects.']
    ];
    
    foreach($projects as $project) {
        $stmt->execute($project);
    }
    
    // Create test announcements
    $stmt = $db->prepare("INSERT INTO announcements (title, content, display, datetime) VALUES (?, ?, ?, ?)");
    
    $announcements = [
        ['Welcome to New Academic Year 2024', 'We are excited to welcome all students to the new academic year. Please check your schedules and prepare for an amazing journey ahead.', 'general', date('Y-m-d H:i:s')],
        ['Final Year Project Registration Open', 'Final year students can now register for their projects. Please submit your preferences before the deadline.', 'computer_science', date('Y-m-d H:i:s', strtotime('+1 day'))],
        ['Mathematics Workshop Series', 'Join our weekly mathematics workshop series every Friday at 3 PM in Room 201.', 'math', date('Y-m-d H:i:s', strtotime('+2 days'))],
        ['Physics Lab Safety Guidelines', 'All physics students must complete the safety orientation before accessing laboratory facilities.', 'physics', date('Y-m-d H:i:s', strtotime('+3 days'))],
        ['Chemistry Research Presentation', 'Dr. Smith will present the latest research findings on molecular dynamics this Thursday.', 'chemistry', date('Y-m-d H:i:s', strtotime('+4 days'))]
    ];
    
    foreach($announcements as $announcement) {
        $stmt->execute($announcement);
    }
    
    echo "Database seeded successfully!\n";
    echo "Test credentials:\n";
    echo "Student: student@example.com / password123\n";
    echo "Admin: admin@example.com / admin123\n";
    
} catch(PDOException $e) {
    echo "Seeding failed: " . $e->getMessage() . "\n";
}
?>