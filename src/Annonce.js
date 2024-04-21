import React from "react";
import Avatar from "avataaars";
import { AvatarGenerator } from 'random-avatar-generator'; // Importer AvatarGenerator depuis la bibliothèque random-avatar-generator
import "./Annonce.css";


function Annonce({ category, count }) {
  // Supposons que vous avez une liste complète d'annonces avec les détails de l'utilisateur
  const annonces = [
    {
      id: 1,
      category: "Outillage",
      title: "Perceuse",
      description: "Perceuse à percussion 500W",
      price: 10,
      image_url: "https://via.placeholder.com/150",
      ville:"Albi, France",
      code_postale: 81000,
      user: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      },
    },
    {
      id: 2,
      category: "Outillage",
      title: "Scie circulaire",
      description: "Scie circulaire 1200W",
      price: 15,
      image_url: "https://via.placeholder.com/150",
      ville:"Paris, France",
      code_postale: 75000,
      user: {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
      },
    },
    {
      id: 3,
      category: "Outillage",
      title: "Ponceuse",
      description: "Ponceuse vibrante 200W",
      price: 5,
      image_url : "https://via.placeholder.com/150",
      ville:"Paris, France",
      code_postale: 75000,
      user: {
        id: 3,
        name: "Alice Snow",
        email: "alice@example.com",
      },
    },
    {
      id: 4,
      category: "Jardinage",
      title: "Tondeuse",
      description: "Tondeuse électrique 1000W",
      price: 20,
      image_url: "https://via.placeholder.com/150",
      ville:"Nice, France",
      code_postale: 6000,
      user: {
        id: 4,
        name: "Bob Brown",
        email: "bob7500@example.com",
      },
    },
    {
      id: 5,
      category: "Jardinage",
      title: "Taille-haie",
      description: "Taille-haie électrique 500W",
      price: 10,
      image_url: "https://via.placeholder.com/150",
      ville:"Toulouse, France",
      code_postale: 31000,
      user: {
        id: 5,
        name: "Eve Wilson",
        email: "eve.wil@example.com",
      },
    },
    {
      id: 6,
      category: "Outillage",
      title: "Perceuse",
      description: "Perceuse à percussion 500W",
      price: 10,
      image_url: "https://via.placeholder.com/150",
      ville:"Grenoble, France",
      code_postale: 38000,
      user: {
        id: 6,
        name: "John Doe",
        email: "jojo85@example.com",
      },
    },
    {
      id: 7,
      category: "Outillage",
      title: "Scie circulaire",
      description: "Scie circulaire 1200W",
      price: 15,
      image_url: "https://via.placeholder.com/150",
      ville: "Paris, France",
      code_postale: 75000,
      user: {
        id: 7,
        name: "Jane Smith",
        email: "smithy@example.com",
      },
    },
    {
      id: 8,
      category: "Outillage",
      title: "Ponceuse",
      description: "Ponceuse vibrante 200W",
      price: 5,
      image_url : "https://via.placeholder.com/150",
      location: "Paris, France",
      code_postale: 75000,
      user: {
        id: 8,
        name: "Alice Snow",
        email: "alicou@example.com",
      },
    },
    {
      id: 9,
      category: "Jardinage",
      title: "Tondeuse",
      description: "Tondeuse électrique 1000W",
      price: 20,
      image_url: "https://via.placeholder.com/150",
      ville: "Paris, France",
      code_postale: 75000,
      user: {
        id: 9,
        name: "Bob Brown",
        email: "boby@example.com",
      },
    },

    // Ajoutez d'autres annonces avec différentes catégories et utilisateurs si nécessaire
  ];

  // Filtrer les annonces en fonction de la catégorie
  const filteredAnnonces = annonces.filter(
    (annonce) => annonce.category === category
  );

  // Sélectionner le nombre d'annonces spécifié
  const selectedAnnonces = filteredAnnonces.slice(0, count);

  const generator = new AvatarGenerator(); // Créer une instance de AvatarGenerator



  return (
    <div id="categorie">
      <p>{category}</p>
      {selectedAnnonces.map((annonce) => (
        <div className="annonce" key={annonce.id}>
  <div className="user-container">
    <Avatar
      style={{ width: '25px', height: '25px' }}
      avatarStyle='Circle'
      {...generator.generateRandomAvatar()} // Utiliser la fonction pour générer un avatar aléatoire
    />
    <p>User: {annonce.user.name}</p> {/* Afficher le nom de l'utilisateur */}
  </div>
  <img src={annonce.image_url} alt={annonce.title} id="image-annonce"/>
  <div className="text-container">
    <div className="description">
    <p>{annonce.title}</p>
    <p>{annonce.price} €</p>
    </div>
  <div className="location">
    <p>{annonce.ville}</p>
    <p>{annonce.code_postale}</p>
    </div>
    </div>
</div>
      ))}
    </div>
  );
}

export default Annonce;
