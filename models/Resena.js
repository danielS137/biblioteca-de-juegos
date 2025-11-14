const mongoose = require('mongoose');
const { Schema } = mongoose; 

const ResenaSchema = new mongoose.Schema({

    juego:{
        type: Schema.Types.ObjectId,
        ref: 'Juego',
        required: [true, 'El juego es obligatorio']
    },
    puntuacion: {
        type: Number, 
        required: [true, 'La puntuación es obligatoria'],
        min: [1, 'La puntuación mínima es 1'],
        max: [5, 'La puntuación máxima es 5']
    },
    texto: {
        type: String,
        required: [true, 'El texto de la reseña es obligatorio'],
        trim: true
    },
    autor: {
        type: String,
        default: 'Anónimo',
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resena', ResenaSchema)