import React from "react";
//import {countryByPage, allCountries, paged} from './Home';

export default function Paged({ countryByPage, allCountries, paged }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / countryByPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='paged'>
                {
                    pageNumbers.length && pageNumbers.map(number => {
                        return (
                            <button 
                            className='number' 
                            key={number} 
                            onClick={() => paged(number)}
                            >
                            {number}
                            </button>

                        )

                    })
                }
            </ul>
        </nav>
    )
}