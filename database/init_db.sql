-- Créer la base de données
DROP DATABASE IF EXISTS outils_db;
CREATE DATABASE IF NOT EXISTS outils_db;

-- Utiliser la base de données créée
USE outils_db;

-- Créer la table 'users'
CREATE TABLE IF NOT EXISTS users (
    idname VARCHAR(10) PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    date_enter TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table 'annonces'
CREATE TABLE IF NOT EXISTS annonces (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL, -- Spécifiez la précision pour le prix
    category VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    author_idname VARCHAR(100),
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image MEDIUMBLOB,  -- Modifier pour stocker le chemin de l'image
    FOREIGN KEY (author_idname) REFERENCES users(idname) ON DELETE SET NULL -- Ajustement pour gérer la suppression
);

-- Insérer des données dans 'users'
INSERT INTO users (idname, nom, prenom, email, password) VALUES 
('notorious', 'McGregor', 'Conor', 'mcgregor.conor@gmail.com', 'password123'),
('putin', 'Khabib', 'Nurmagomedov', 'nurma.khabib@gmail.com', 'password123'),
('jon.jones', 'Jones', 'Jon', 'jonnybones@gmail.com', 'password123');

-- Insérer des données dans 'annonces'
INSERT INTO annonces (title, content, price, category, city, postal_code, author_idname) VALUES 
('Scie circulaire', 'Scie circulaire Bosch 1400W', 99.99, 'Outils', 'Paris', '75000', 'notorious'),
('Marteau', 'Marteau 500g', 9.99, 'Outils', 'Marseille', '13000', 'putin'),
('Perceuse', 'Perceuse sans fil 18V', 129.99, 'Outils', 'Lyon', '69000', 'jon.jones'),
('Ponceuse', 'Ponceuse excentrique 300W', 49.99, 'Outils', 'Toulouse', '31000', 'notorious'),
('Tournevis', 'Tournevis cruciforme', 4.99, 'Outils', 'Bordeaux', '33000', 'putin');
