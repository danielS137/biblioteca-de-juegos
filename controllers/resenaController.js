const Resena = require('../models/Resena');

//C = CREAR NUEVAS RESEÑAS
exports.crearResena = async (req, res) => {
    try{
        const nuevaResena = new Resena(req.body);
        await nuevaResena.save();
        res.status(201).json(nuevaResena);
    } catch (error) {
        res.status(400).json({ 
            error: 'error al crear la reseña', 
            details: error.message
        })
    }
}

//R = OBTENER RESEÑAS
exports.obtenerResena = async (req, res) => {
    try {
        // FILTRA LAS RESEÑAS POR ID DEL JUEGO ENVIADO A LA QUERY
        const filtro = req.query.juegoId ? { juego: req.query.juegoId }: {};
        const resenas = await Resena.find(filtro)
        res.status(200).json(resenas);
    } catch (error) {
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
        res.status(200).json(resenaActualizada)
    } catch (error){
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
        res.status(200).json ({ msg: 'Reseña eliminada exitosamente'})
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la reseña seleccionada'})
    }
};