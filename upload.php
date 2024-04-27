<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName); // Remplacer par vos paramètres de connexion

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['image']['tmp_name'])) {
        $file = $_FILES['image']['tmp_name'];
        $image = addslashes(file_get_contents($file));

        $query = "INSERT INTO votre_table (image) VALUES (?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $image);
        if($stmt->execute()){
            echo json_encode(["message" => "L'image a été uploadée avec succès"]);
        } else {
            echo json_encode(["error" => "Une erreur est survenue"]);
        }
    }
} else {
    echo json_encode(["error" => "Méthode non autorisée"]);
}
?>
