import morgan from "morgan";
import { loggerError } from "./logger.js";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config.js";
import { User } from "../models/user.js";

morgan.token("contentOfBody", function (req, res) {
  const content = req.body;
  const status = (
    typeof res.headersSent !== `boolean`
      ? Boolean(res._header)
      : res.headersSent
  )
    ? res.statusCode
    : undefined;

  // get status color
  const color =
    status >= 500
      ? 31 // red
      : status >= 400
        ? 33 // yellow
        : status >= 300
          ? 36 // cyan
          : status >= 200
            ? 32 // green
            : 0; // no color
  return `\x1b[${color}m${JSON.stringify(content)}\x1b[0m`;
});

morgan.token(`status`, (req, res) => {
  const status = (
    typeof res.headersSent !== `boolean`
      ? Boolean(res._header)
      : res.headersSent
  )
    ? res.statusCode
    : undefined;

  // get status color
  const color =
    status >= 500
      ? 31 // red
      : status >= 400
        ? 33 // yellow
        : status >= 300
          ? 36 // cyan
          : status >= 200
            ? 32 // green
            : 0; // no color
  return `\x1b[${color}m${status}\x1b[0m`;
});

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms \n:contentOfBody",
);

const unknownEndpoint = (req, res) => {
  return res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  }
  loggerError(`${error.name}: ${error.message}`);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.default.verify(
        authorization.substring(7),
        SECRET_KEY,
      );
      req.user = await User.findByPk(req.decodedToken.id);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ error: "Admins only" });
  }
  next();
};

export { logger, unknownEndpoint, errorHandler, tokenExtractor, requireAdmin };
