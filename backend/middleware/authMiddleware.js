const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Authentication failed: No token provided.' });
        }

        const tokenParts = authorizationHeader.split(' ');
        if (tokenParts.length !== 2) {
            return res.status(401).json({ error: 'Authentication failed: Invalid token format.' });
        }

        const scheme = tokenParts[0];
        const tokenValue = tokenParts[1];

        if (scheme !== 'Bearer') {
            return res.status(401).json({ error: 'Authentication failed: Token must be Bearer type.' });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
        } catch (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(401).json({ error: 'Authentication failed: Token verification failed.' });
        }

        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ error: 'Authentication failed: Invalid token payload.' });
        }

        req.user = {
            id: decodedToken.id,
            email: decodedToken.email || null,
            role: decodedToken.role || 'user',
            iat: decodedToken.iat,
            exp: decodedToken.exp
        };

        next();
    } catch (error) {
        console.error('Unexpected Authentication Error:', error.message);
        res.status(401).json({ error: 'Authentication failed: Invalid token.' });
    }
};
