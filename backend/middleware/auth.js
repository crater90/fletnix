const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.headers['x-access-token']?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = checkAuth;