const logger = require("./logger");
const jwt = require("jsonwebtoken");
const { Session } = require("../models");

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

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    return response.status(400).json({
      error: error.errors.map((e) => e.message),
    });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({
      error: "invalid database query",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  sessionExtractor,
};
