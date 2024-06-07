const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                email,
                password: passwordHash,
                username
            });
        const savedUser = await newUser.save();
        jwt.sign(
            {
                id: savedUser._id
            },
            process.env.JWT_SECRET || 'secretjos',
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) console.error(err);
                res.cookie('token', token);

                res.json(
                    {
                        token,
                        id: savedUser._id,
                        email: savedUser.email,
                        username: savedUser.username,
                        createdAt: savedUser.createdAt,
                        updatedAt: savedUser.updatedAt
                    }
                )
            }
        )

       
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User
            .findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario no existe' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Password invalidas' });
        }
        jwt.sign(
            {
                id: user._id
            },
            process
                .env.JWT_SECRET || 'secretjos', {
            expiresIn: 3600
        },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token);
                res.json(
                    {
                        token,
                        id: user._id,
                        email: user.email,
                        username: user.username,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                )
                
            }
        )   }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al loguear usuario' });
    }
}

const logout = (req, res) => { 
    res.clearCookie('token');
    res.json({ msg: 'Logout exitoso' });
    return res.status(200);
}
const profile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if(!user) return res.status(404).json({msg: 'Usuario no encontrado'});

    return res.json({
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    });
    res.send('Profile'); 
}

const registerFirebase = async (req, res) => {
    const { email, username } = req.body;

    try {
        const newUser = new User({
            email,
            username
        });

        const savedUser = await newUser.save();

        res.json({
            id: savedUser._id,
            email: savedUser.email,
            username: savedUser.username,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
}

const loginFirebase = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario no existe' });
        }

        res.json({
            id: user._id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al loguear usuario' });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, username } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { email, username }, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            id: updatedUser._id,
            email: updatedUser.email,
            username: updatedUser.username,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});  // Encuentra todos los documentos en la colección de usuarios

        // Si deseas devolver un arreglo vacío cuando no hay usuarios, simplemente envía 'users'
        if (!users.length) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        // Transforma la lista de usuarios si es necesario, o envía directamente
        const userList = users.map(user => ({
            id: user._id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));

        res.status(200).json(userList);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ error: 'Error al obtener los usuarios', message: error.message });
    }
};



module.exports = { register, getAllUsers, updateUser, deleteUser, login, logout, profile, registerFirebase, loginFirebase };


