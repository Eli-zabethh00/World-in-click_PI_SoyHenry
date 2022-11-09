import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity, getAllCountries } from '../redux/actions';


export default function CreateActivity() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allCountries = useSelector((state) => state.allCountries);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        difficulty: '1',
        duration: '1',
        season: [],
        countries: []
    });

    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    const validate = (input) => {
        let errors = {};
        if (!input.name) errors.name = 'Debe colocar un nombre para la actividad.';
        else if (/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = 'El nombre de la actividad no puede tener caracteres especiales o tildes.';

        if (!input.season.length) errors.season = 'Debe seleccionar una o más opciones.';

        if (!input.countries.length) errors.countries = 'Debe seleccionar una o más opciones.';

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postActivity(input));
        alert('La actividad ha sido creada con éxito!');
        setInput({
            name: '',
            difficulty: '1',
            duration: '1',
            season: [],
            countries: []
        });
        history.push('/home');
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleVarious = (e) => {
        if (e.target.name === 'countries') {
            setInput({
                ...input,
                countries: [...input.countries, e.target.value],
                [e.target.value]: 'none'
            });
        } else {
            if (e.target.checked) {
                setInput({
                    ...input,
                    season: [...input.season, e.target.value]
                });
            };
        };
    };

    const handleDelete = (e) => {
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== e)
        });
    };

    return (
        <div>
            <Link to='/home'>
                <button>Inicio</button>
            </Link>

            <h1>Nueva actividad turística</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        placeholder='Ingrese un nombre'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Dificultad: </label>
                    <input
                        type='number'
                        value={input.difficulty}
                        name='difficulty'
                        min='1'
                        max='5'
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div>
                    <label>Duración:
                        <input
                            type='number'
                            value={input.duration}
                            name='duration'
                            min='1'
                            max='24'
                            onChange={(e) => handleChange(e)}
                        />
                        horas
                    </label>
                </div>

                <div>
                    <label>Temporada: </label>
                    <label>
                        <input
                            type='checkbox'
                            value='Primavera'
                            name='Primavera'
                            onChange={(e) => handleVarious(e)}
                        />
                        Primavera
                    </label>

                    <label>
                        <input
                            type='checkbox'
                            value='Verano'
                            name='Verano'
                            onChange={(e) => handleVarious(e)}
                        />
                        Verano
                    </label>

                    <label>
                        <input
                            type='checkbox'
                            value='Otoño'
                            name='Otoño'
                            onChange={(e) => handleVarious(e)}
                        />
                        Otoño
                    </label>

                    <label>
                        <input
                            type='checkbox'
                            value='Invierno'
                            name='Invierno'
                            onChange={(e) => handleVarious(e)}
                        />
                        Invierno
                    </label>
                    {errors.season && (
                        <p>{errors.season}</p>
                    )}
                </div>

                <div>
                    <label>Agregar país: </label>
                    <select
                        defaultValue='none'
                        name='countries'
                        onChange={(e) => handleVarious(e)}>
                        <option disabled value='none'>Seleccione un país</option>
                        {
                            allCountries.length && allCountries.sort((a, b) => a.name.localeCompare(b.name)).map(c => {
                                return (
                                    <option value={c.name}>{c.name}</option>
                                )
                            })
                        }

                    </select>
                    {errors.countries && (
                        <p>{errors.countries}</p>
                    )}
                </div>
                <div>
                    <label>Países seleccionados</label>
                    {
                        input.countries.length ? input.countries.map(name => {

                            const actualCountry = allCountries?.find((c) => c.name === name)
                            if (actualCountry) {
                                return (
                                    <div >
                                        <a href='#' onClick={() => handleDelete(actualCountry.name)} >X</a>
                                        <img src={actualCountry.image} alt={actualCountry.id} />
                                        <span>{actualCountry.id}</span>
                                    </div>
                                )
                            }
                        }) : null
                    }
                </div>

                <div>
                    <button type='submit'>Crear actividad</button>
                </div>
            </form>
        </div>
    )
};