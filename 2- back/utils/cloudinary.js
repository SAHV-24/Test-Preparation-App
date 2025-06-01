const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Sube una imagen a Cloudinary y retorna la URL segura.
 * @param {string} filePath - Ruta temporal del archivo o base64.
 * @param {string} folder - Carpeta en Cloudinary (opcional).
 * @returns {Promise<string>} URL segura de la imagen subida.
 */
async function uploadImageToCloudinary(filePath, folder = 'fyevp') {
  const options = { folder };
  const result = await cloudinary.uploader.upload(filePath, options);
  return result.secure_url;
}

module.exports = { uploadImageToCloudinary };
