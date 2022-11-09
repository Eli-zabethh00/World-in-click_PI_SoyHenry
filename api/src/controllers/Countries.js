const { Router } = require('express');
const {getAllCountriesDb} = require("../callApi/Load");

const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    const allCountries = await getAllCountriesDb();
    //console.log(allCountries)
    try{
        if(name){
            const country = await allCountries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
            //console.log(country)
            country.length? 
            res.status(201).json(country) :
            res.status(404).send('No se encontraron coincidencias');
        }else{
        
            res.status(201).json(allCountries);
        }
    }catch(error){
        //res.status(404).send(error);
        console.log(error)
    };
}); 


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const allCountries = await getAllCountriesDb();
    try{
        if(id){
            const country = await allCountries.filter(c => c.id.toLowerCase() == id.toLowerCase());

            country.length? 
            res.status(201).json(country) : 
            res.status(404).send('No se encontraron coincidencias');
        }
    }catch(error){
        res.status(404).json(error);
    };
});

module.exports = router;