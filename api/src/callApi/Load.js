const axios = require('axios');
const { Country, Activity } = require('../db');
//const { all } = require('../routes');

const getCountriesApi = async () => {
    const callApi = await axios.get('https://restcountries.com/v3/all');

    const data = await callApi.data.map(d => {
        return {
            id: d.cca3,
            name: d.name.common,
            image: d.flags.filter(a => a.includes("png")).join(""),
            continent: d.continents.join(), 
            capital: d.capital, 
            subregion: d.subregion,
            area: d.area,
            population: d.population
        };
    });
    
    await Country.bulkCreate(data);
    console.log('creado');
};

const getAllCountriesDb = async () => {
    return await Country.findAll({
        include: [{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: { attributes: [] }
        }]
    });
};


module.exports = {
    getCountriesApi,
    getAllCountriesDb
};