const express = require('express');
const router = express.Router();

// Ici, on ajoute le code pour les routes
// Récupérer tous les utilisateurs
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Ajouter un utilisateur
router.post('/users', (req, res) => {
  const user = req.body;
  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) throw err;
    res.send('Utilisateur ajouté avec succès.');
  });
});

module.exports = router;
