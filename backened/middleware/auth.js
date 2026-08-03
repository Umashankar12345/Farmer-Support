const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'secret_key';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth Error: Invalid token verification failed:', err.message);
    res.status(401).json({ error: 'Token is not valid' });
  }
}

module.exports = { verifyJWT };
