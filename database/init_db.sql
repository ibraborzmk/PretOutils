-- Créer la base de données

DROP DATABASE IF EXISTS outils_db;
CREATE DATABASE IF NOT EXISTS outils_db;

-- Utiliser la base de données créée
USE outils_db;

-- Créer la table 'users'
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    price DECIMAL NOT NULL,
    category VARCHAR(255) NOT NULL,
    author_id INT NOT NULL,
    published_date DATE,

    FOREIGN KEY (author_id) REFERENCES users(id)
);


-- Insérer des données dans la table 'users'
INSERT INTO users (nom, prenom, email, password) VALUES('Chimaev', 'Khamzat', 'chimaev.khamzat@gmail.com', '123456');
INSERT INTO users (nom, prenom, email, password) VALUES('Nurmagomedov', 'Khabib', 'nurmagomedov.khabib@gmail.com', '123456');
INSERT INTO users (nom, prenom, email, password) VALUES('McGregor', 'Conor', 'mcgregor.conor@gmail.com', '123456');

INSERT INTO articles (title, content, price, category, author_id, published_date) VALUES('Scie circulaire', 'Scie circulaire de marque Bosch', 150.00, 'Outils', 1, '2021-09-01');
INSERT INTO articles (title, content, price, category, author_id, published_date) VALUES('Perceuse sans fil', 'Perceuse sans fil de marque Makita', 100.00, 'Outils', 1, '2021-09-02');
INSERT INTO articles (title, content, price, category, author_id, published_date) VALUES('Marteau', 'Marteau de charpentier', 10.00, 'Outils', 2, '2021-09-03');
INSERT INTO articles (title, content, price, category, author_id, published_date) VALUES('Tournevis', 'Jeu de tournevis', 20.00, 'Outils', 2, '2021-09-04');
INSERT INTO articles (title, content, price, category, author_id, published_date) VALUES('Ponceuse', 'Ponceuse électrique', 50.00, 'Outils', 3, '2021-09-05');


-- Requête pour récupérer tous les utilisateurs
SELECT * FROM users;

-- Requête pour trouver un utilisateur par email
SELECT * FROM users WHERE email = 'mcgregor.conor@gmail.com';

-- Mettre à jour l'email d'un utilisateur
UPDATE users SET email = 'newemail.conor@gmail.com' WHERE id = 3;


