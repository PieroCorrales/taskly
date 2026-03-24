const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('authHeader recibido:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No autorizado, token requerido' });
    }

    const token = authHeader.split(' ')[1];
    console.log('token extraído:', token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('error verificando token:', error.message);
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = protect;