const express = require("express"); //Construir API Rest
const bodyParser = require("body-parser"); //ayuda a analizar la solicitud y crear el objeto req.body
const cors = require("cors"); //proporciona middleware Express para habilitar CORS con varias opciones.
const morgan = require("morgan");
const connectDB = require('./db');
const dotenv = require("dotenv");
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');


const personasRoutes = require('./routes/persona.routes');
const articulosRoutes = require('./routes/articulos.routes');
const pedidosRoutes = require('./routes/pedidos.routes');

// configuramos origin: http: // localhost: 9595.
var corsOptions = {
    origin: "http://localhost:9595"
};
var app = express();
app.use(cors());

connectDB();
app.use(cookieParser());

// realizar parse de content-type - application/json de requests 
app.use(bodyParser.json());
app.use(morgan('dev'));
//  realizar parse de content-type - application/x-www-form-urlencoded de requests 
app.use(bodyParser.urlencoded({ extended: true }));

//habilitar el cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route raiz
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la aplicacion del Cbtis 123 para el cuadro de necesidades" });
});

/* const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
    console.log("Eliminar y sincronizar db");
}); */

app.use('/api/auth', authRoutes);
app.use('/api/people', personasRoutes);
app.use('/api/articulos', articulosRoutes);
app.use('/api/pedidos', pedidosRoutes)

module.exports = app;
