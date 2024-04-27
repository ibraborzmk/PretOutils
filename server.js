const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config(); // Charge les variables d'environnement

const app = express();
app.use(bodyParser.json());

// Configuration de CORS pour autoriser les requêtes de votre application React
app.use(cors({
  origin: 'http://localhost:3000' // Autorise les requêtes CORS uniquement pour ce domaine
}));

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'outils_db'
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL!');
});

// Exemple de route API
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Serveur démarré sur http://localhost:3001');
});
app.get('/annonces', (req, res) => {
  // Ajoutez TO_BASE64 autour de la colonne BLOB
  db.query('SELECT id, title, content, price, category, city, postal_code, author_idname, published_date, TO_BASE64(image) AS imageBase64 FROM annonces', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des annonces');
      console.error(err);
    } else {
      // Traiter les résultats pour inclure le préfixe nécessaire pour l'interprétation correcte des données en tant qu'images
      results.forEach(result => {
        if (result.imageBase64) {
          result.image = `data:image/jpeg;base64,${result.imageBase64}`;
        }
      });
      res.json(results);
    }
  });
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Stocke les fichiers dans le dossier 'uploads'

// Route pour l'upload d'images
app.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'Veuillez uploader un fichier.' });
  }

  const imagePath = file.path;  // Chemin vers l'image sauvegardée

  // Optionnel : Insérer le chemin de l'image dans la base de données
  const query = "INSERT INTO annonces (image_path) VALUES (?)";
  db.query(query, [imagePath], (err, result) => {
    if (err) {
      console.error('Erreur lors de l’insertion du chemin de l’image dans la base de données', err);
      return res.status(500).send({ message: 'Erreur lors de l’enregistrement du fichier.' });
    }
    res.send({ message: 'Fichier uploadé avec succès.', path: imagePath });
  });
});


// Route pour la connexion
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT idname, password AS hashedPassword FROM users WHERE idname = ?', [username], async (error, results) => {
      if (error) {
          return res.status(500).send('Erreur lors de la connexion à la base de données');
      }
      if (results.length > 0) {
          const comparisonResult = password==results[0].hashedPassword ;
          console.log('Résultat de la comparaison :', comparisonResult);
          console.log(password);
          console.log(results[0].hashedPassword);
          console.log(results[0].idname);
          console.log(username);
          if (comparisonResult) {
              res.send('Connexion réussie');
          } else {
              res.send('Identifiants incorrects');
          }
      } else {
          res.send('Identifiants incorrects');
      }
  });
});