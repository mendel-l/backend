const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../model/assosiationsModels');
const secretKey = 'tu_clave_secreta'; 
const blacklistedTokens = []; 

module.exports = {

  async login(req, res) {
    const { username, password } = req.body;
    try {
      // Buscar al usuario y asociar el rol
      const user = await User.findOne({
        where: { username},
         // Excluir la contraseña en la respuesta
        include: [
          {
            model: Role,
            attributes: ['name'], // Solo obtener el nombre del rol
          }
        ]
      });

      // Verificar si el usuario no existe
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Comparar la contraseña ingresada con la almacenada en la base de datos
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Obtener el nombre del rol (asumo que la relación está correctamente definida)
      const roleName = user.Role ? user.Role.name : null;

      // Crear el token JWT con la información del usuario
      const token = jwt.sign({ username: user.username, role: roleName }, secretKey, { expiresIn: '1h' });

      // Responder al frontend con el token, username y role
      res.json({
        username: user.username,
        role: roleName,  // Devuelve el rol
        token,
      });
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      res.status(500).json({ error: 'Error durante el inicio de sesión' });
    }
  },

  async logout(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
      // Añadir el token a la lista negra
      blacklistedTokens.push(token);

      res.sendStatus(204); // Logout exitoso, sin contenido
    } catch (error) {
      res.status(500).json({ error: 'Error logging out' });
    }
  },

  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Si no hay token

    if (blacklistedTokens.includes(token)) {
      return res.sendStatus(403); // El token está en la lista negra, no permitido
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403); // Token inválido o expirado
      req.user = user;
      next();
    });
  },

  // Ejemplo de una ruta protegida
  protectedRoute(req, res) {
    res.send('This is a protected route');
  }
};
