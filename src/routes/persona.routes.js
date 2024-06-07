const { Router } = require('express');
const router = Router();
const authRequired = require('../middleware/validateToken');

const {
    getPersonas,
    getPersona,
    createPersona,
    deletePersona,
    updatePersona
} = require('../controllers/persona.controller');
const validatorSchema = require('../middleware/validator.middleware');
const personaSchema  = require('../schemas/persona.schema');

router.get('/personas', getPersonas);

router.get('/personas/:id', getPersona);

router.post('/personas', validatorSchema(personaSchema), createPersona);

router.delete('/personas/:id', deletePersona);

router.put('/personas/:id', updatePersona);

module.exports = router;
