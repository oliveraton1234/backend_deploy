const app = require('./server')
const port = app.get('port')

// asignar port para escuchar requests
const PORT = process.env.PORT || 9595;

app.listen(PORT, () => {
    console.log(`Server esta ejecutandose en puerto ${PORT}.`);
});

