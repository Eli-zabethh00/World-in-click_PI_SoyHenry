import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCountries } from '../redux/actions';

export default function NavBar() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllCountries());
    };

    return (
        <div>
            <Link to='/home'>
                <button onClick={(e) => handleClick(e)}>
                    Inicio
                </button>
            </Link>

            <Link to='/home/create-activity'>
                <button>Crear Actividad</button>
            </Link>
        </div>
    );
};