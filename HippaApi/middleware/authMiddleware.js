const jwt = require('jsonwebtoken');

exports.VerifyToken = function(req, res, next) {
   
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

   
    if (!token) {
        return res.status(403).json({ error: "No token found" });
    }

    
    jwt.verify(token, 'token456789', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized access, invalid token' });
        }

       
        req.user = decoded;
        next();
    });
};
