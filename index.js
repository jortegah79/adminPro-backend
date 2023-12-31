require('dotenv').config();
const express = require("express");
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

//midlewares

app.use(cors());

//carpeta publica 

app.use( express.static('public'));
app.use(express.json());
//base de datos

dbConnection();

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/busqueda'));
app.use('/api/upload',require('./routes/upload'));



app.listen(process.env.PORT, () => {
    console.log("Funcionando en el puerto " + process.env.PORT)
});