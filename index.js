require('dotenv').config();
const express = require("express");
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

//midlewares

app.use(cors());

app.use(express.json());
//base de datos

dbConnection();

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log("Funcionando en el puerto " + process.env.PORT)
});