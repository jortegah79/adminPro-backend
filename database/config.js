const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log("bbdd funciona")
    } catch (error) {
        console.log(error)
        throw new Error("Error al arrancar la bbdd");
    }
}

module.exports = {
    dbConnection:dbConnection
}