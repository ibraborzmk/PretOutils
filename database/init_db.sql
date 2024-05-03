-- Créer la base de données
DROP DATABASE IF EXISTS outils_db;
CREATE DATABASE IF NOT EXISTS outils_db;
USE outils_db;

-- Créer la table 'users'
CREATE TABLE IF NOT EXISTS users (
    idname VARCHAR(10) PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100),
    pp MEDIUMBLOB, -- photo de profil
    password VARCHAR(100),
    date_enter TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer les autres tables nécessaires
CREATE TABLE IF NOT EXISTS conversations (
    conversation_id INT AUTO_INCREMENT PRIMARY KEY,
    creator_idname VARCHAR(10),
    receiver_idname VARCHAR(10),
    title VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT,
    user_idname VARCHAR(10),
    user_dest_idname VARCHAR(10),
    message TEXT NOT NULL,
    sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    FOREIGN KEY (user_idname) REFERENCES users(idname) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS annonces (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    sous_category VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    author_idname VARCHAR(100),
    author_pp VARCHAR(255),
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255),
    FOREIGN KEY (author_idname) REFERENCES users(idname) ON DELETE SET NULL
);


INSERT INTO users (idname, nom, prenom, email, password) VALUES 
('notorious', 'McGregor', 'Conor', 'mcgregor.conor@gmail.com', 'password123'),
('putin', 'Khabib', 'Nurmagomedov', 'nurma.khabib@gmail.com', 'password123'),
('jon.jones', 'Jones', 'Jon', 'jonnybones@gmail.com', 'password123'),
('rocky', 'Balboa', 'Rocky', 'rrr@gmail.com', 'password'),
('creed', 'Creed', 'Adonis', 'creed.adonis@gmail.com', 'password123'),
('apollo', 'Creed', 'Apollo', 'apollo.creed@gmail.com', 'password123'),
('drago', 'Drago', 'Ivan', 'drago.ivan@gmail.com', 'password123');

-- Insérer les conversations
INSERT INTO conversations  (creator_idname, receiver_idname, title) VALUES 
('notorious', 'putin', 'Conor vs Khabib'),
('notorious', 'jon.jones', 'Conor vs Jon'),
('putin', 'jon.jones', 'Khabib vs Jon');


-- Maintenant, insérer les messages en utilisant les IDs corrects
INSERT INTO messages (conversation_id, user_idname, user_dest_idname, message) VALUES 
(1, 'notorious', 'putin', 'Salut Khabib, tu vas bien ?'),
(1, 'putin', 'notorious', 'Salut Conor, oui et toi ?'),
(2, 'notorious', 'jon.jones', 'Salut Jon, tu vas bien ?'),
(2, 'jon.jones', 'notorious', 'Salut Conor, oui et toi ?'),
(3, 'putin', 'jon.jones', 'Salut Jon, tu vas bien ?'),
(3, 'jon.jones', 'putin', 'Salut Khabib, oui et toi ?');


-- Continuation des insertions dans 'annonces' avec ajustement des prix
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Échelle télescopique', 'Échelle pliable en aluminium', 24, 'Maison & Jardin', 'Échelles et échafaudages', 'Nice', '06000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/echelle.jpg'),
('Tondeuse à gazon', 'Tondeuse électrique 1600W', 40, 'Maison & Jardin', 'Entretien du gazon', 'Nantes', '44000', 'creed', '/home/bmk/Documents/techno4/PretOutils/database/tondeuse.jpg'),
('Tronçonneuse', 'Tronçonneuse thermique 45cm', 52, 'Maison & Jardin', 'Outils de taille', 'Strasbourg', '67000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/tronconneuse.jpg'),
('Kit d irrigation', 'Kit complet pour arrosage de jardin', 18, 'Maison & Jardin', 'Outils de plantation', 'Montpellier', '34000', 'apollo', '/home/bmk/Documents/techno4/PretOutils/database/irrigation.jpg'),
('Kit de peinture', 'Rouleaux, pinceaux et bâche', 6, 'Maison & Jardin', 'Outils de peinture', 'Lille', '59000', 'drago', '/home/bmk/Documents/techno4/PretOutils/database/peinture.jpg'),
('Souffleuse à feuilles', 'Souffleuse électrique 3000W', 30, 'Maison & Jardin', 'Entretien du gazon', 'Rennes', '35000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/souffleuse.jpg'),
('Rouleau à gazon', 'Rouleau manuel pour aplatir le gazon', 15, 'Maison & Jardin', 'Entretien du gazon', 'Reims', '51100', 'creed', '/home/bmk/Documents/techno4/PretOutils/database/rouleau.jpg'),
('Étagère de garage', 'Étagère métallique robuste', 20, 'Maison & Jardin', 'Échelles et échafaudages', 'Saint-Étienne', '42000', 'apollo', '/home/bmk/Documents/techno4/PretOutils/database/etagere.jpg'),
('Compresseur d air', 'Compresseur 50L', 50, 'Maison & Jardin', 'Outils électriques', 'Le Havre', '76600', 'drago', '/home/bmk/Documents/techno4/PretOutils/database/compresseur.jpg'),
('Niveau laser', 'Niveau laser automatique', 16, 'Maison & Jardin', 'Mesure et traçage', 'Toulon', '83000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/niveau.jpg');


INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Jeu de clés à douille', 'Jeu complet de clés à douille pour voiture', 16, 'Voiture', 'Entretien général', 'Dijon', '21000', 'creed', '/home/bmk/Documents/techno4/PretOutils/database/cles.jpg'),
('Kit de distribution', 'Kit de distribution avec pompe à eau', 48, 'Voiture', 'Réparation de moteur', 'Angers', '49000', 'apollo', '/home/bmk/Documents/techno4/PretOutils/database/distribution.jpg'),
('Multimètre automobile', 'Multimètre numérique pour voiture', 12, 'Voiture', 'Systèmes électriques', 'Limoges', '87000', 'drago', '/home/bmk/Documents/techno4/PretOutils/database/multimetre.jpg'),
('Jante alliage', 'Jante en alliage léger 17 pouces', 40, 'Voiture', 'Pneus et roues', 'Clermont-Ferrand', '63000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/jante.jpg'),
('Kit de polissage', 'Kit complet pour polissage carrosserie', 10, 'Voiture', 'Carrosserie et esthétique', 'Brest', '29200', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/polissage.jpg'),
('Amortisseurs', 'Amortisseurs avant pour berline', 30, 'Voiture', 'Suspension et direction', 'Le Mans', '72000', 'creed', '/home/bmk/Documents/techno4/PretOutils/database/amortisseurs.jpg'),
('Silencieux', 'Silencieux en inox pour échappement', 26, 'Voiture', 'Échappement', 'Amiens', '80000', 'apollo', '/home/bmk/Documents/techno4/PretOutils/database/silencieux.jpg');

-- Insertions pour la catégorie 'Électronique'
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Ordinateur portable', 'Ordinateur portable 15 pouces performant', 200, 'Électronique', 'Informatique', 'Perpignan', '66000', 'drago', '/home/bmk/Documents/techno4/PretOutils/database/ordinateur.jpg'),
('Antenne parabolique', 'Antenne parabolique de 80 cm', 10, 'Électronique', 'Télécommunications', 'Metz', '57000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/antenne.jpg'),
('Carte électronique', 'Carte mère pour montage électronique', 8, 'Électronique', 'Composants électroniques', 'Besançon', '25000', 'apollo', '/home/bmk/Documents/techno4/PretOutils/database/carte.jpg'),
('Projecteur LED', 'Projecteur LED 4K UHD', 100, 'Électronique', 'Audiovisuel', 'Orléans', '45000', 'creed', '/home/bmk/Documents/techno4/PretOutils/database/projecteur.jpg'),
('Caméra de surveillance', 'Caméra IP Wi-Fi pour sécurité intérieure', 14, 'Électronique', 'Sécurité électronique', 'Mulhouse', '68100', 'drago', '/home/bmk/Documents/techno4/PretOutils/database/camera.jpg'),
('Batterie externe', 'Batterie externe 10000mAh', 5, 'Électronique', 'Énergie et alimentation', 'Rouen', '76000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/batterie.jpg');


-- Insertions pour la catégorie 'Loisirs'
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Console de jeux', 'Console de jeux dernière génération', 100, 'Loisirs', 'Jeux vidéo', 'Versailles', '78000', 'drago', '/home/bmk/Documents/techno4/PretOutils/database/console.jpg'),
('Ballon de football', 'Ballon officiel de la Ligue 1', 4, 'Loisirs', 'Jeux de balle', 'Nancy', '54000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/ballon.jpg'),
('Pétanque', 'Jeu complet de boules de pétanque', 5, 'Loisirs', 'Jeux de boules', 'Avignon', '84000', 'creed', '/home/bmk/Documents/techno4/PretOutils/database/petanque.jpg'),
('Puzzle 3D', 'Puzzle 3D de la Tour Eiffel', 6, 'Loisirs', 'Jeux de construction', 'Poitiers', '86000', 'apollo', '/home/bmk/Documents/techno4/PretOutils/database/puzzle.jpg'),
('Piscine gonflable', 'Grande piscine familiale gonflable', 15, 'Loisirs', 'Jeux d eaux', 'Troyes', '10000', 'drago', '/home/bmk/Documents/techno4/PretOutils/database/piscine.jpg');

-- Insertions pour la catégorie 'Autre'
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Décorations de Noël', 'Lot complet de décorations pour Noël', 4, 'Autre', 'Articles saisonniers', 'Ajaccio', '20000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/decorations.jpg'),
('Diable de déménagement', 'Diable robuste pour charges lourdes', 10, 'Autre', 'Équipement de déménagement', 'Béziers', '34500', 'creed', '/home/bmk/Documents/techno4/PretOutils/database/diable.jpg'),
('Kit pour mariage', 'Kit de décoration complet pour mariage', 15, 'Autre', 'Matériel de fête et événementiel', 'La Rochelle', '17000', 'apollo', '/home/bmk/Documents/techno4/PretOutils/database/mariage.jpg'),
('Pièce de collection', 'Pièce de monnaie rare de 1789', 20, 'Autre', 'Articles de collection et hobbies rares', 'Cherbourg', '50100', 'drago', '/home/bmk/Documents/techno4/PretOutils/database/piece.jpg'),
('Niche pour chien', 'Niche isolée pour grand chien', 12, 'Autre', 'Équipements pour animaux de compagnie', 'Grenoble', '38000', 'rocky', '/home/bmk/Documents/techno4/PretOutils/database/niche.jpg'),
('Kit éducatif', 'Kit de science pour enfants', 8, 'Autre', 'Matériel éducatif et didactique', 'Bourges', '18000', 'creed', '/home/bmk/Documents/techno4/PretOutils/database/kit.jpg'),
('Service de jardinage', 'Service de jardinage à domicile', 12, 'Autre', 'Services divers', 'Le Puy-en-Velay', '43000', 'apollo', '/home/bmk/Documents/techno4/PretOutils/database/jardinage.jpg');

