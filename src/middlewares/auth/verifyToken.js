const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { headers } = req;
  if (!headers.authorization)
    return res.status(401).send({ message: "Unauthorized" });

  const [type, token] = headers.authorization.split(" ");
  console.log("type, token: ", type, token);
  if (type !== "Bearer" || !token)
    return res.status(401).send({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded: ", decoded);
    req["user"] = decoded;
  } catch (_) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  return next();
};
module.exports = verifyToken;
