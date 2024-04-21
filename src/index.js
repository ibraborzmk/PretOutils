import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Assurez-vous d'avoir un fichier index.css pour les styles globaux de votre application
import Head from './Header';
import Image from './bande-image'; // Importez votre nouveau composant
import img from './bande-image2.jpg'; // Importez votre image
import Annonce from './Annonce';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (
    <React.StrictMode>
      <Head/>
      <Image src={img} alt="bande-index" />
      <Annonce category="Outillage" count={6} />
      <Annonce category="Outillage" count={6} />
    </React.StrictMode>
);


// ReactDOM.render(

