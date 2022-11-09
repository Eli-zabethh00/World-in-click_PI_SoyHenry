import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryById } from '../redux/actions';
import NavBar from './NavBar';

export default function CountryDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const countryDetail = useSelector((state) => state.countryById);

    useEffect(() => {
        dispatch(getCountryById(id));
    }, [dispatch, id])

    return (
        <div>
            <NavBar/>
            <div>
                {
                    countryDetail.length &&
                    <div>
                        <h1>{countryDetail[0].name} ({countryDetail[0].id})</h1>
                        <img src={countryDetail[0].image} alt='No disponible' />
                        <h3> Continente: {countryDetail[0].continent} </h3>
                        <h3> Capital: {countryDetail[0].capital.join(', ')}</h3>
                        <h3> Subregión: {countryDetail[0].subregion}</h3>
                        <h3> Población: {countryDetail[0].population}</h3>
                        <h3> Área: {countryDetail[0].area} km²</h3>
                    </div>
                }
            </div>


            <div>
                <h2>Actividades Turísticas</h2>

                {
                    countryDetail[0]?.activities.length ?
                        countryDetail[0].activities.map(a => {
                            return (
                                <div>
                                    <h3>Nombre: {a.name}</h3>
                                    <h3>Dificultad: {a.difficulty}</h3>
                                    <h3>Duración: {a.duration} horas</h3>
                                    <h3>Temporada: {a.season.join(", ")}</h3>
                                </div>
                            );
                        })
                        :
                        <h4>
                            Este país no posee actividades
                        </h4>
                }

                <Link to='/home/create-activity'>
                    <button>Añadir actividad</button>
                </Link>

            </div>

        </div>
    )
};
