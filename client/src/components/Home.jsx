import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCountries, getCountryByName, filterByContinent, filterByActivity, orderAlphabetically, orderByPopulation, getCountryById, getAllActivities, clean } from "../redux/actions";
import CountryCard from './CountryCard';
import Paged from './Paged';
import NavBar from './NavBar';
import '../styles/Home.css';

export default function Home() {

    const dispatch = useDispatch();

    const allCountries = useSelector(state => state.filteredCountries);
    const allActivities = useSelector(state => state.allActivities);
    const [currentPage, setCurrentPage] = useState(1);
    const [countryByPage, setCountryByPage] = useState(10);
    
    const indexOfLastCountry = currentPage * countryByPage;
    const indexOfFirstCountry = indexOfLastCountry - countryByPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const [name, setName] = useState('');

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllActivities());
    }, [dispatch]); 

    function handleAllCountries(e) {
        e.preventDefault();
        //dispatch(clean());
        dispatch(getAllCountries());
    };

    function handleByName(e) {
        setName(e.target.value);
        e.preventDefault();
        dispatch(getCountryByName(e.target.value));
        setCurrentPage(1);
    };
    // function handleSubmit(e){
    //     e.preventDefault();
    //     dispatch(getAllCountries(e.target.value));
    //     setCurrentPage(1);
    // }
    function handleByContinent(e) {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
    };

    function handleByActivity(e) {
        e.preventDefault();
        dispatch(filterByActivity(e.target.value));
    };

    function handleAlphabetically(e) {
        e.preventDefault();
        dispatch(orderAlphabetically(e.target.value));
    };

    function handleByPopulation(e) {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
    };

    function handleDetail(e) {
        e.preventDefault();
        dispatch(getCountryById(e))
    };

    return (

        <div className='home'>

            <NavBar/>
            <h1> World In Click</h1>

            <div>
                <label>Buscar país por nombre</label>

                <input
                    value={name}
                    type='text'
                    placeholder='Ingrese un país'
                    onChange={(e) => handleByName(e)}
                />
            </div>

            <div>
                Ordenar alfabéticamente
                <select defaultValue= 'none' onChange={(e) => handleAlphabetically(e)}>
                    <option disabled value='none'></option>
                    <option value='asc'>Ordenar de A-Z
                    </option>
                    <option value='desc'>Ordenar de Z-A
                    </option>
                </select>
            </div>

            <div>
                Ordenar por población
                <select defaultValue= 'none' onChange={(e) => handleByPopulation(e)}>
                    <option disabled value='none'></option>
                    <option value='asc'>Menor a mayor</option>
                    <option value='desc'>Mayor a menor</option>
                </select>
            </div>

            <div>
                Buscar por continente
                <select id='continent' onChange={(e) => handleByContinent(e)}>
                    <option value='all'>Todos</option>
                    <option value='africa'>África</option>
                    <option value='antarctica'>Antártida</option>
                    <option value='asia'>Asia</option>
                    <option value='europe'>Europa</option>
                    <option value='north america'>Norteamérica</option>
                    <option value='oceania'>Oceanía</option>
                    <option value='south america'>Sudamérica</option>
                </select>
            </div>

            <div>
                Buscar por actividad
                {
                    !allActivities.length ?
                        <select disabled>
                            <option>Sin actividades</option>
                        </select>
                        :
                        <select onChange={(e) => handleByActivity(e)}>
                            <option value='all'>Todos</option>
                            {
                                allActivities.map(a => {
                                    return <option value={a.name} key={a.id}>
                                        {a.name}
                                    </option>
                                })
                            }
                        </select>
                }
            </div>

            <button onClick={e => handleAllCountries(e)}>Volver a cargar los países</button>

            <Paged
                countryByPage={countryByPage}
                allCountries={allCountries.length}
                paged={paged}
            />

            {
                currentCountries.length && currentCountries.map(c => {
                    return (
                        <div>

                            <CountryCard
                                name={c.name}
                                continent={c.continent}
                                image={c.image}
                            />

                            <Link to={'/home/countries/' + c.id}>
                                <button onChange={() => handleDetail(c.id)}>
                                    Ver detalle
                                </button>
                            </Link>
                        </div>
                    )
                })
            }

        </div>
    );
};