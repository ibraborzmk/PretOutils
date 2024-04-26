-- Créer la base de données
CREATE DATABASE userdb IF NOT EXISTS;

-- Utiliser la base de données créée
USE userdb;

-- Créer la table 'users'
CREATE TABLE users (
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
    author_id INT NOT NULL,
    published_date DATE,
    FOREIGN KEY (author_id) REFERENCES users(id)
);


-- Insérer des données dans la table 'users'
INSERT INTO users (nom, prenom, email, password) VALUES('Chimaev', 'Khamzat', 'chimaev.khamzat@gmail.com', '123456');
INSERT INTO users (nom, prenom, email, password) VALUES('Nurmagomedov', 'Khabib', 'nurmagomedov.khabib@gmail.com', '123456');
INSERT INTO users (nom, prenom, email, password) VALUES('McGregor', 'Conor', 'mcgregor.conor@gmail.com', '123456');

-- Commandes SQL supplémentaires pour gérer et interroger les données



-- Requête pour récupérer tous les utilisateurs
SELECT * FROM users;

-- Requête pour trouver un utilisateur par email
SELECT * FROM users WHERE email = 'mcgregor.conor@gmail.com';

-- Mettre à jour l'email d'un utilisateur
UPDATE users SET email = 'newemail.conor@gmail.com' WHERE id = 3;

-- Supprimer un utilisateur
DELETE FROM users WHERE id = 3;
