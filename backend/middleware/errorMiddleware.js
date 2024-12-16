import { domainWhitelist, ipWhitelist } from "../config/whitelist.js";

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found!";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "😂" : err.stack,
  });
};

const ipFilter = (req, res, next) => {
  const reqDomain = req.get("host");
  const reqIp = req.ip;
  const whitelist = [...domainWhitelist, ...ipWhitelist];

  try {
    if (whitelist.includes(reqDomain || reqIp)) {
      res.status(201);
      next();
    }
  } catch (err) {
    res.status(401);
    throw new Error(`Unauthorized access! IP: ${reqIp}, Domain: ${reqDomain}`);
  }
};

export { notFound, errorHandler, ipFilter };
