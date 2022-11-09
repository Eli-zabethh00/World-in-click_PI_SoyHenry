import React from 'react';
//import { Link } from 'react-router-dom';

export default function Card({ name, image, continent }) {
    return (
        <div>
            <h2>{name}</h2>
            <h3>Continente</h3>
            <h4>{continent}</h4>
            <img src={image} alt='No disponible' />
        </div>
    )
}