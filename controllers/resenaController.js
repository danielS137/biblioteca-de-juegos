const Resena = require('../models/Resena');
const mongoose = require('mongoose');

//C = CREAR NUEVAS RESEÑAS
exports.crearResena = async (req, res) => {
    try{
        console.log('📝 Datos recibidos para reseña:', req.body);
        
        // ✅ Validar que el ID del juego sea válido
        if (!req.body.juego) {
            return res.status(400).json({ 
                error: 'El campo juego es requerido'
            });
        }
        
        if (!mongoose.Types.ObjectId.isValid(req.body.juego)) {
            return res.status(400).json({ 
                error: 'El ID del juego no es válido',
                details: `ID recibido: ${req.body.juego}`
            });
        }
        
        // ✅ Validar puntuación
        const puntuacion = Number(req.body.puntuacion);
        if (isNaN(puntuacion) || puntuacion < 1 || puntuacion > 5) {
            return res.status(400).json({ 
                error: 'La puntuación debe ser un número entre 1 y 5'
            });
        }
        
        // ✅ Asegurar que el autor tenga un valor por defecto
        const datosResena = {
            juego: req.body.juego,
            puntuacion: puntuacion,
            texto: req.body.texto,
            autor: req.body.autor || 'usuario anonimo'
        };
        
        console.log('📋 Datos procesados:', datosResena);
        
        const nuevaResena = new Resena(datosResena);
        await nuevaResena.save();
        
        console.log('✅ Reseña creada exitosamente:', nuevaResena._id);
        res.status(201).json(nuevaResena);
    } catch (error) {
        console.error('❌ Error al crear la reseña:', error.message);
        console.error('❌ Detalles completos:', error);
        
        // Mejor manejo de errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            const errores = Object.keys(error.errors).map(key => ({
                campo: key,
                mensaje: error.errors[key].message
            }));
            return res.status(400).json({ 
                error: 'Error de validación', 
                errores
            });
        }
        
        res.status(400).json({ 
            error: 'Error al crear la reseña', 
            details: error.message
        })
    }
}

//R = OBTENER RESEÑAS
exports.obtenerResena = async (req, res) => {
    try {
        // FILTRA LAS RESEÑAS POR ID DEL JUEGO ENVIADO A LA QUERY
        const filtro = req.query.juegoId ? { juego: req.query.juegoId }: {};
        const resenas = await Resena.find(filtro).populate('juego', 'nombre');
        console.log('✅ Reseñas encontradas:', resenas.length);
        res.status(200).json(resenas);
    } catch (error) {
        console.error('❌ Error al obtener reseñas:', error.message);
        res.status(500).json({ 
        error: 'error al obtener la reseña',
        details: error.message
        });
    }
}; 

//R = OBTENER RESEÑAS POR ID
exports.obtenerResenaPorId = async (req, res) => {
    try {
        const resena = await Resena.findById(req.params.id).populate('juego', 'nombre')
        if (!resena){
            return res.status(404).json ({ msg: 'Reseña no encontrada' })
        }
        res.status(200).json(resena);
    } catch (error) {
        console.error('❌ Error al buscar reseña:', error.message);
        res.status(500).json ({ error: 'Error al encontrar la reseña'})
    }
}; 

//U = ACTUALIZAR RESEÑAS 
exports.actualizarResena = async (req, res) => {
    try {
        const resenaActualizada = await Resena.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
            new: true, 
            runValidators: true
        })
        if(!resenaActualizada){
            return res.status(404).json ({ msg: 'No se ha podido actualizar su reseña'})
        }
        console.log('✅ Reseña actualizada:', resenaActualizada._id);
        res.status(200).json(resenaActualizada)
    } catch (error){
        console.error('❌ Error al actualizar reseña:', error.message);
        res.status(500).json({
            error: 'error al actualizar su reseña',
            details: error.message
        })
    }
}; 

//DELETE = ELIMINAR 
exports.eliminarResena = async (req, res) => {
    try {
        const resena = await Resena.findByIdAndDelete(req.params.id)
        
        if(!resena){
            return res.status(404).json ({ msg: 'Su reseña no se ha podido eliminar' })
        }
        console.log('✅ Reseña eliminada:', req.params.id);
        res.status(200).json ({ msg: 'Reseña eliminada exitosamente'})
    } catch (error) {
        console.error('❌ Error al eliminar reseña:', error.message);
        res.status(500).json({ error: 'Error al eliminar la reseña seleccionada'})
    }
};