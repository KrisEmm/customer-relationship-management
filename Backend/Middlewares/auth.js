const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  // console.log("Header:", authHeader);
  if (!authHeader) {
    const error = new Error("No Autenticado, NO Existe un JWT");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let revisarToken;
  try {
    revisarToken = jwt.verify(token, "MATIASEMMANUEL");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!revisarToken) {
    const error = new Error("No autenticado");
    error.statusCode = 401;
    throw error;
  }
  next();
};
