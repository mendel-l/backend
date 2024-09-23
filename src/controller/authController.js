const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/usersModel');

const secretKey = 'tu_clave_secreta'; 
const blacklistedTokens = []; 

module.exports = {

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Comparar la contraseña ingresada con la almacenada
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Crear el token JWT
      const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
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
