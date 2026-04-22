const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

const authMiddleware = (req, res, next) => {
   try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({ msg: "No token or invalid format" });
      }

      const token = authHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");

      req.user = decoded;

      next();
   } catch (error) {
      console.error(error);

      return res.status(401).json({ msg: "Token is not valid" });
   }
};

module.exports = authMiddleware;