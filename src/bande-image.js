// ImageComponent.js
import React from 'react';
import './bande-image.css';

function ImageComponent(props) {
  return (
    <div className="image-container">
    <img src={props.src} alt={props.alt} cla/>
    <div className="text-image-container">
        <p>Rejoignez nous pour partager avec nous les outils</p>
        <button>Rejoindre</button>
      </div>
    </div>
  );
}

export default ImageComponent;
