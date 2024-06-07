const Articulo = require('../models/articulos.model');  // Asegúrate de que la ruta al modelo es correcta

exports.createArticulo = async (req, res) => {
    try {
        const newArticulo = new Articulo({
            nombre_articulo: req.body.nombre_articulo,
            descripcion_articulo: req.body.descripcion_articulo,
            precioUnitario: req.body.precioUnitario,
            unidadMedida: req.body.unidadMedida,
        });

        await newArticulo.save();
        res.status(201).send(newArticulo);
    } catch (error) {
        res.status(400).send(error);
    }
};

// GET: Listar todos los artículos
exports.getAllArticulos = async (req, res) => {
    try {
        const articulos = await Articulo.find();
        res.status(200).send(articulos);
    } catch (error) {
        res.status(500).send(error);
    }
};

// GET: Obtener un artículo por ID
exports.getArticuloById = async (req, res) => {
    try {
        const articulo = await Articulo.findById(req.params.id);
        if (!articulo) {
            return res.status(404).send();
        }
        res.send(articulo);
    } catch (error) {
        res.status(500).send(error);
    }
};


// PUT: Actualizar un artículo
exports.updateArticulo = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['nombre_articulo', 'descripcion_articulo', 'precioUnitario', 'unidadMedida', 'id_partidas', 'id_institucion'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const articulo = await Articulo.findById(req.params.id);

        if (!articulo) {
            return res.status(404).send();
        }

        updates.forEach((update) => articulo[update] = req.body[update]);
        await articulo.save();
        res.send(articulo);
    } catch (error) {
        res.status(400).send(error);
    }
};

// DELETE: Eliminar un artículo
exports.deleteArticulo = async (req, res) => {
    try {
        const articulo = await Articulo.findByIdAndDelete(req.params.id);
        if (!articulo) {
            return res.status(404).send();
        }
        res.send(articulo);
    } catch (error) {
        res.status(500).send(error);
    }
};
