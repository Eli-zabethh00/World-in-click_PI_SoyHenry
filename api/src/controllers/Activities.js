const { Router } = require('express');
const { Country, Activity } = require('../db');

const router = Router();

router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;

    try{
        const [newActivity, boolean] = await Activity.findOrCreate({
            where: { name: name[0].toUpperCase() + name.slice(1)},
            defaults: { difficulty, duration, season }
        });
    
        boolean && countries.forEach(async c => {
            const countryDb = await Country.findOne({
                where:{
                    name: c
                }
            });
            // solo relaciona las tablas si el pais existe previamente y si la actividad no habia sido creada
            countryDb.addActivity(newActivity) 
        });
        
        res.status(201).json(newActivity)

    }catch(error){
        console.log(error)
        res.status(404).json({error:'Se ha producido un error'});
    }
});


router.get('/', async (req, res) => {
    try {
       const allActivities = await Activity.findAll({
          include: [{
            model: Country,
            attributes: ['name'],
            through: { attributes: [] }
        }]
       })
       res.status(201).json(allActivities)
    } catch (error) {
       res.status(404).json({ error: "No se encontraron actividades" })
    }
 
 });

module.exports = router;