const { Router } = require('express');
const { login, getAllUsers, updateUser, register, logout, profile, registerFirebase, loginFirebase, deleteUser } = require('../controllers/auth.controller');
const router = Router();
const authRequired = require('../middleware/validateToken');
const validatorSchema = require('../middleware/validator.middleware');
const { loginSchema, registerSchema } = require('../schemas/auth.schema');


router.post('/register', register);

router.post('/login',  login);

router.post('/logout', logout);

router.get('/profile', profile);

router.post('/registerFirebase', registerFirebase);

router.post('/loginFirebase', loginFirebase);

router.put('/editUser/:id',  updateUser);

router.delete('/deleteUser/:id',  deleteUser);

router.get('/getAllUsers',  getAllUsers);

module.exports = router;





