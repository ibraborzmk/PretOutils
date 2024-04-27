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
  db.query('SELECT * FROM annonces', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des annonces');
      console.error(err);
    } else {
      res.json(results);
    }
  });
});
