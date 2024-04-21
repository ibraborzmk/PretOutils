import React, { useState } from 'react';
import './Header.css';
import iconPreter from './preter.png'; // Importez l'icône
import SearchBar from './SearchBar';

function App() {
  const [annonces, setAnnonces] = useState([]); // État pour stocker les annonces
  const [filteredAnnonces, setFilteredAnnonces] = useState([]); // État pour stocker les annonces filtrées
  const [favoris, setFavoris] = useState([]); // État pour stocker les annonces favorites
  const [showMoreButtonsAutre, setShowMoreButtonsAutre] = useState(false); // État pour afficher les boutons supplémentaires
  const [showMoreButtonsLoisirs, setShowMoreButtonsLoisirs] = useState(false); // État pour afficher les boutons supplémentaires de la catégorie Loisirs
  const [showMoreButtonsElectronique, setShowMoreButtonsElectronique] = useState(false); // État pour afficher les boutons supplémentaires
  const [showMoreButtonsMaison, setShowMoreButtonsMaison] = useState(false); // État pour afficher les boutons supplémentaires
  const [showMoreButtonsVoiture, setShowMoreButtonsVoiture] = useState(false); // État pour afficher les boutons supplémentaires
  
  // Fonction pour ajouter une annonce (c'est juste un exemple, vous devrez le remplacer par une fonction de gestion des annonces réelle)
  const ajouterAnnonce = () => {
    const nouvelleAnnonce = {
      id: annonces.length + 1,
      titre: "Titre de l'annonce",
      description: "Description de l'annonce",
      prix: 0,
    };
    setAnnonces([...annonces, nouvelleAnnonce]);
  };

  // Fonction pour ajouter une annonce aux favoris
  const ajouterFavori = (annonce) => {
    setFavoris([...favoris, annonce]);
  };

  const handleSearch = (term) => {
    const filtered = annonces.filter((annonce) =>
      annonce.titre.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredAnnonces(filtered);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="icon-container">
          <img src={iconPreter} alt="Preter Icon" className="icon-preter" />
          <p className="icon-text">PretOutils</p>
        </div>
        <button onClick={ajouterAnnonce} id="ajouter">Ajouter une annonce</button>
        <SearchBar onSearch={handleSearch} id="rechercher" />
        <button onClick={() => ajouterFavori(filteredAnnonces[0])}>Ajouter aux favoris</button>
        <button id="message">Message</button>
        <button id="se-connecter">Se connecter</button>
      </header>
      <div className="categorie">
          {/* Boutons supplémentaires alignés verticalement */}
          <button
            onMouseEnter={() => setShowMoreButtonsMaison(true)}
            onMouseLeave={() => setShowMoreButtonsMaison(false)}
          >
            Maison & Jardin
          </button>
          {showMoreButtonsMaison && (
            <div className="categorie-maison">
              {/* Boutons supplémentaires à afficher */}
              <button>Meubles</button>
              <button>Electroménager</button>
              <button>Outillage</button>
            </div>
          )}
          
          <button
            onMouseEnter={() => setShowMoreButtonsVoiture(true)}
            onMouseLeave={() => setShowMoreButtonsVoiture(false)}
          >
            Voiture
          </button>
          {showMoreButtonsVoiture && (
            <div className="categorie-voiture">
              {/* Boutons supplémentaires à afficher */}
              <button>Voiture 1</button>
              <button>Voiture 2</button>
              <button>Voiture 3</button>
            </div>
          )}


          <button
            onMouseEnter={() => setShowMoreButtonsElectronique(true)}
            onMouseLeave={() => setShowMoreButtonsElectronique(false)}
          >
            Electronique
          
          </button>
          {showMoreButtonsElectronique && (
            <div className="categorie-electronique">
              {/* Boutons supplémentaires à afficher */}
              <button>Smartphone</button>
              <button>Ordinateur</button>
              <button>TV</button>
            </div>
          )}
          <button
            onMouseEnter={() => setShowMoreButtonsLoisirs(true)}
            onMouseLeave={() => setShowMoreButtonsLoisirs(false)}
          >
            Loisirs
            </button>
          {showMoreButtonsLoisirs && (
            <div className="categorie-loisirs">
              {/* Boutons supplémentaires à afficher */}
              <button>Jeux vidéo</button>
              <button>Livres</button>
              <button>Loisirs créatifs</button>
            </div>
          )}
          <button
            onMouseEnter={() => setShowMoreButtonsAutre(true)}
            onMouseLeave={() => setShowMoreButtonsAutre(false)}
          >
            Autre
          </button>
          {showMoreButtonsAutre && (
            <div className="categorie-autre">
              {/* Boutons supplémentaires à afficher */}
              <button>Autre bouton 1</button>
              <button>Autre bouton 2</button>
              <button>Autre bouton 3</button>
            </div>
          )}
        </div>
      <main>
        <div>
          {/* Affichage des annonces filtrées */}
          {filteredAnnonces.map((annonce) => (
            <div key={annonce.id}>
              <h2>{annonce.titre}</h2>
              <p>{annonce.description}</p>
              <p>Prix: {annonce.prix} €</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
