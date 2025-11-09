const mongoose = require('mongoose');


const JuegoSchema = new mongoose.Schema({
    
    nombre: {
        type: String, 
        required: [true, 'el nombre del juego es obligatorio'],
        trim: true,
        unique: true
    },

    plataforma: {
        type: String, 
        required: [true, 'la plataforma es obligatoria']
    },

    portadaURL: {
        type: String,
        required: false 
    },

    estado: {
       type: String, 
       enum: ['Pendiente', 'Jugando', 'Completado'], 
       default: 'Pendiente' 
    },
     
horasJugadas: {
    type: Number,
    default: 0,
    min: 0
    
}

}, {
    timestamps: true //hace que mongoose agregue dos campos: el primer campo es la fecha de creación del juego y el segundo campo es la fecha de la ultima actualización
});

module.exports = mongoose.model('Juego', JuegoSchema);