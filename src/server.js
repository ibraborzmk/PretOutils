const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'votre_nom_utilisateur',
    password: 'votre_mot_de_passe',
    database: 'nom_de_votre_base_de_donnees'
});

connection.connect();

// Endpoint pour récupérer les annonces
app.get('/annonces', (req, res) => {
    connection.query('SELECT * FROM Annonce', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
