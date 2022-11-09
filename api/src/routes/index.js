const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countries = require('../controllers/Countries');
const activities = require('../controllers/Activities');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countries);
router.use('/activities', activities);

module.exports = router;
