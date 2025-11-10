//IMPORTACIÓN DE BIBLIOTECAS Y CREACIÓN DE CONSTANTES
require('dotenv').config();

const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3000; 
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors()); 

app.use(express.json()); 

//CONEXIÓN A LA BASE DE DATOS
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('conexión exitosa a MongoDB Atlas');
    })
        .catch(err => {
         console.log('error de conexión:', err.message); 
    });


// RUTAS
const juegoRoutes = require('./routes/juegoRoutes');
app.use('/api/juegos', juegoRoutes);

const resenaRoutes = require('./routes/resenaRoutes');
app.use('/api/resenas', resenaRoutes);


//GET PARA PRUEBA EN POSTMANS
app.get('/prueba', (req, res) => {
    res.send('La ruta PRUEBA funciona ✅');
});
  

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
