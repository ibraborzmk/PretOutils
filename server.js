const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config(); // Charge les variables d'environnement

const app = express();
app.use(bodyParser.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Utilise la variable d'environnement ou 'localhost' par défaut
  user: process.env.DB_USER || 'root',      // Utilise la variable d'environnement ou 'root' par défaut
  password: process.env.DB_PASSWORD || 'root', // Utilise la variable d'environnement ou 'root' par défaut
  database: process.env.DB_DATABASE || 'userdb' // Utilise la variable d'environnement ou 'userdb' par défaut
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
