const { verifyToken } = require("../config/jwtConfig");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader);
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
