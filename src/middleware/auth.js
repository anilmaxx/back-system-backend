const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    let token = req.cookies?.token;
    if (!token) {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (!token) return res.status(401).json({ message: 'No token, Access Denied' });
    try {
        const decoded = jwt.verify(token.replace(/^Bearer\s+/i, ''), process.env.JWT_SECRET);
        req.user = decoded.user || decoded;
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: 'Invalid token payload' });
        }
        next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;