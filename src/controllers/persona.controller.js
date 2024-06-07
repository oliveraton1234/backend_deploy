const Persona = require('../models/persona.model');

const getPersonas = async (req, res) => {
    try {
        const personas = await Persona.find();
        res.json(personas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener personas' });
    }
};

const createPersona = async (req, res) => {
    const { nombre, apepat, apemat, telefono, direccion, photo, status } = req.body;
    try {
        const newPersona = new Persona({
            nombre,
            apepat,
            apemat,
            telefono,
            direccion,
            photo,
            status: status || true
        });
        const savedPersona = await newPersona.save();
        res.json(savedPersona);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear persona' });
    }

};

const getPersona = async (req, res) => {
    const { id } = req.params;
    try {
        const persona = await Persona.findById(id);
        res.json(persona);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener persona' });
    }
 };

const updatePersona = async (req, res) => {
    const { id } = req.params;
    const { nombre, apepat, apemat, telefono, direccion, photo, status } = req.body;
    try {
        const updatedPersona = await Persona.findByIdAndUpdate(id, {
            nombre,
            apepat,
            apemat,
            telefono,
            direccion,
            photo,
            status
        }, { new: true });
        res.json(updatedPersona);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar persona' });
    }
};

const deletePersona = async (req, res) => {
    const { id } = req.params;
    try {
        await Persona.findByIdAndDelete(id);
        res.json({ message: 'Persona eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar persona' });
    }
 };

module.exports = { getPersonas, getPersona, createPersona, updatePersona, deletePersona };

