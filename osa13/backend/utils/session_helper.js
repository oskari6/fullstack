const { Session } = require("../models");
const logger = require("./logger");
const jwt = require("jsonwebtoken");

const sessionExtractor = async (request, response, next) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const foundSession = await Session.findOne({
    where: { token, userId: decodedToken.id },
  });
  if (!foundSession || new Date(foundSession.expires) < new Date()) {
    return response
      .status(401)
      .json({ error: "no session found or session expired" });
  }
  request.user = foundSession.userId;
  next();
};

module.exports = {
  sessionExtractor,
};
