const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const app = express();


app.use(cors());
require("dotenv").config(); // Charge les variables d'environnement

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });


// Chemin absolu vers le dossier où les images sont stockées
const imagesDirectory = path.join(__dirname, 'database');

// Servir les images du dossier 'database'
app.use('/image', express.static(imagesDirectory));
app.use(bodyParser.json());

// Configuration de CORS pour autoriser les requêtes de votre application React
app.use(
  cors({
    origin: "http://localhost:3000", // Autorise les requêtes CORS uniquement pour ce domaine
  })
);

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "outils_db",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion : " + err.stack);
    return;
  }
  console.log("Connecté à la base de données MySQL!");
});


app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
      res.json({
          message: 'Fichier téléchargé avec succès',
          filename: req.file.filename
      });
  } else {
      res.status(400).send('Erreur lors du téléversement du fichier');
  }
});

// Exemple de route API
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/annonces", (req, res) => {
  // Ajoutez TO_BASE64 autour de la colonne BLOB
  db.query(
    "SELECT id, title, content, price, category, city, postal_code, author_idname, published_date, image FROM annonces",
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des annonces");
        console.error(err);
      } else {
        res.json(results);
      }
    }
  );
});

// Route pour la connexion
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Assumant que 'username' correspond à 'idname' dans votre table 'users'
  db.query(
    "SELECT idname, password FROM users WHERE idname = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error(
          "Erreur lors de la connexion à la base de données :",
          error
        );
        return res.status(500).send({
          message: "Erreur lors de la connexion à la base de données",
          success: false,
        });
      }
      if (results.length > 0) {
        const user = results[0];
        if (password === user.password) {
          // Comparaison simpliste, envisagez d'utiliser bcrypt dans un environnement de production pour plus de sécurité
          res.status(200).send({
            success: true,
            message: "Connexion réussie",
            userId: user.idname,
          });
        } else {
          res.status(401).send({
            success: false,
            message: "Identifiant ou mot de passe incorrect",
          });
        }
      } else {
        res
          .status(404)
          .send({ success: false, message: "Identifiants incorrects" });
      }
    }
  );
});

// Route pour obtenir les informations de l'utilisateur
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const query =
    "SELECT idname, nom , prenom, email FROM users WHERE idname = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      res
        .status(500)
        .send(
          "Erreur lors de la récupération des informations de l’utilisateur"
        );
      console.error(err);
    } else {
      res.json(result);
    }
    console.log(result);
  });
});

// Route pour obtenir les annonces de l'utilisateur
app.get("/user/:id/annonces", (req, res) => {
  const userId = req.params.id;
  const query =
    "SELECT id, title, content, price, category, city, postal_code, author_idname, published_date, image FROM annonces WHERE author_idname = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      res
        .status(500)
        .send("Erreur lors de la récupération des annonces de l’utilisateur");
      console.error(err);
    } else {
      res.json(results);
      console.log("Requête pour les annonces de l'utilisateur:", userId);
      console.log("Résultats:", results);
    }
  });
});

// Route pour obtenir tous les messages d'une conversation spécifique
app.get("/messages/conversation/:conversationId", (req, res) => {
  const conversationId = req.params.conversationId;
  const query = "SELECT * FROM messages WHERE conversation_id = ?";
  db.query(query, [conversationId], (err, results) => {
    if (err) {
      res
        .status(500)
        .send("Erreur lors de la récupération des messages de la conversation");
      console.error(err);
    } else {
      res.json(results);
    }
  });
});

app.get("/conversations/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM conversations WHERE creator_idname = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des conversations");
      console.error(err);
    } else {
      console.log("Conversations récupérées:", results);
      res.json(results);
    }
  });
});

// Route pour effectuer une recherche
app.get("/recherche/:term", (req, res) => {
  const term = req.params.term;
  const query = `SELECT * FROM annonces WHERE title LIKE '%${term}%' OR category LIKE '%${term}%' OR content LIKE '%${term}%'`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la recherche");
      console.error(err);
    } else {
      res.json(results);
    }
  });
});

app.post('/ajouterAnnonce', upload.single('image'), (req, res) => {
  const { title, content, price, category, sousCategory, city, postalCode } = req.body;
  const image = req.file ? req.file.path : null;
  const author_idname = req.body.author_idname; // Supposition sur l'origine de cette donnée

  const insertQuery = 'INSERT INTO annonces (title, content, price, category, sous_category, author_idname, city, postal_code, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(insertQuery, [title, content, price, category, sousCategory, author_idname, city, postalCode, image], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Erreur lors de l'ajout de l'annonce");
      }
      res.status(201).send("Annonce ajoutée avec succès");
  });
});


app.get('/categorie/:category/:sousCategory', (req, res) => {
  const category = req.params.category;
  const sousCategory = req.params.sousCategory;
  console.log('Category:', category);
  console.log('Sous-category:', sousCategory);

  // Updated query to include filtering by sousCategory as well
  const query = 'SELECT * FROM annonces WHERE category = ? AND sous_category = ?';

  // Execute the query with both category and sousCategory as parameters
  db.query(query, [category, sousCategory], (err, results) => {
      if (err) {
          res.status(500).send("Erreur lors de la récupération des annonces");
          console.error(err);
      } else {
          res.json(results);
          console.log('Annonces récupérées:', results);
      }
  });
});



app.post('/inscription', async (req, res) => {
  const { nom, prenom, email,username, password } = req.body;

  // Code pour insérer dans la base de données
  const query = 'INSERT INTO users (idname, nom, prenom, email, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [username ,nom, prenom, email, password], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send({ success: false, message: 'Erreur lors de l\'inscription' });
      }
      res.status(201).send({ success: true, message: 'Inscription réussie' });
  });
});


app.post('/envoyerMessage', (req, res) => {
  const { conversationId, envoyeur, destinataire, messageText } = req.body;

  // Vous devez valider ici les données reçues pour vous assurer de leur intégrité
  if (!conversationId || !envoyeur || !destinataire || !messageText) {
    return res.status(400).send({ success: false, message: 'Données requises manquantes' });
  }

  const query = `
    INSERT INTO messages (conversation_id, user_idname,user_dest_idname, message, sent_date)
    VALUES (?, ?, ?, ?, NOW())
  `;

  db.query(query, [conversationId, envoyeur, destinataire, messageText], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion du message :", err);
      return res.status(500).send({ success: false, message: 'Erreur lors de lenvoi du message' });
    }
    res.status(201).send({ success: true, message:  messageText});
  });
});



app.listen(3001, () => {
  console.log("Serveur démarré sur http://localhost:3001");
});