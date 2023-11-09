const express=require ("express");
require('dotenv').config();
const {dbConnection}=require('./database/config');
const cors=require('cors');

const app=express();


//base de datos
app.use(cors);
dbConnection();


app.get('/',(req,res)=>{
    res.status(200).json({
        ok:true,
        msg:"hola mundo"
    })
});


app.listen(process.env.PORT,(()=>{
    console.log("Funcionando en el puerto "+ process.env.PORT)
}))