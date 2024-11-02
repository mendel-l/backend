// middleware/uploadMiddleware.js
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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

// Configuración de almacenamiento personalizado
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '_' + file.originalname;
    cb(null, uniqueName);
  },
});

// Creamos un almacenamiento personalizado que redimensiona antes de guardar
const customStorage = {
  _handleFile(req, file, cb) {
    // Generar el nombre y ruta del archivo
    const filename = Date.now() + '_' + file.originalname;
    const filepath = path.join('uploads', filename);

    // Procesar la imagen con Sharp y guardarla
    const transformer = sharp()
      .resize(500, 500, {
        fit: 'inside', // Redimensionar sin recortar, ajustando dentro de 500x500
        withoutEnlargement: true, // No ampliar si la imagen ya es más pequeña
      })
      .toFormat('jpeg');

    const outStream = fs.createWriteStream(filepath);

    // Procesar y guardar la imagen
    file.stream
      .pipe(transformer)
      .on('error', cb)
      .pipe(outStream);

    outStream.on('error', cb);
    outStream.on('finish', function () {
      cb(null, {
        destination: 'uploads/',
        filename: filename,
        path: filepath,
        size: fs.statSync(filepath).size,
      });
    });
  },
  _removeFile(req, file, cb) {
    fs.unlink(file.path, cb);
  },
};

// Configuración de Multer
const upload = multer({
  storage: customStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Límite de 50MB por archivo
  fileFilter: fileFilter,
});

module.exports = upload; // Exportamos el objeto 'upload'
