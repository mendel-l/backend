// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

// Función para filtrar archivos
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Solo se permiten imágenes'));
  }
}

// Configuración de Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Límite de 10MB por archivo
  fileFilter: fileFilter,
});

module.exports = upload; // Exporta el objeto upload, no una función middleware específica
