const Juego = require('../models/Juego');

//LISTA Y SIGNIFICADO DE LOS ERRORES

//CASOS EXITOSOS
//201 = cuando se creó correctamente (POST)
//200 = el resultado solicitado fue exitoso (GET, PUT, DELETE)

//CASOS ERROR
//400 = cuando los datos son inválidos (culpa del usuario)
//404 = cuando el recurso es inexistente
//500 = error del servidor


//C - CREAR
exports.crearJuego = async (req, res) => {
    try {
        console.log('📝 Datos recibidos:', req.body);
        const nuevoJuego = new Juego(req.body);  
        await nuevoJuego.save();
        console.log('✅ Juego creado:', nuevoJuego._id);
        res.status(201).json(nuevoJuego);
    } catch (error) {
        console.error('❌ Error al crear juego:', error.message);
        res.status(400).json({  
            error: 'Error al agregar el juego',
            details: error.message  
        });
    }
};

//R - OBTENER DATOS
exports.obtenerJuego = async (req, res) => {
    try {
        console.log('🔍 Obteniendo todos los juegos...');
        const juegos = await Juego.find();
        console.log('✅ Juegos encontrados:', juegos.length);
        res.status(200).json(juegos);  
    } catch (error) {
        console.error('❌ Error al obtener juegos:', error.message);
        res.status(500).json({ 
            error: 'Ha sucedido algo con el servidor, intentar de nuevo'
        });
    }
};

//R - OBTENER DATOS POR ID
exports.obtenerJuegoPorId = async (req, res) => {
    try {
        console.log('🔍 Buscando juego con ID:', req.params.id);
        const juego = await Juego.findById(req.params.id);  

        if (!juego) {
            return res.status(404).json({ msg: 'Juego no encontrado' });
        }
        res.status(200).json(juego);
    } catch (error) {
        console.error('❌ Error al buscar juego:', error.message);
        res.status(500).json({ error: 'Error al encontrar el juego' });
    }
};

//ACTUALIZAR JUEGO
exports.actualizarJuego = async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!juegoActualizado) {
      return res.status(404).json({ msg: 'Juego no encontrado' });
    }

    res.status(200).json(juegoActualizado);
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar el juego',
      details: error.message
    });
  }
};


//D - ELIMINAR
exports.eliminarJuego = async (req, res) => {
    try {
        console.log('🗑️ Eliminando juego:', req.params.id);
        const juego = await Juego.findByIdAndDelete(req.params.id);

        if (!juego) {
            return res.status(404).json({ msg: 'Juego no encontrado para eliminar' });
        }
        console.log('✅ Juego eliminado');
        res.status(200).json({ msg: 'Juego eliminado exitosamente' });
    } catch (error) {
        console.error('❌ Error al eliminar:', error.message);
        res.status(500).json({ error: 'Error al eliminar el juego seleccionado' });
    }
};