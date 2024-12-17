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
  const whitelist = [
    ...process.env.DOMAIN_WHITELIST.split(","),
    ...process.env.IP_WHITELIST.split(","),
  ];

  console.log(`IP: ${reqIp}, Domain: ${reqDomain}`);
  console.log(whitelist);

  try {
    if (whitelist.includes(reqDomain) || whitelist.includes(reqIp)) {
      console.log("Successful connection from authorized IP.");
      res.status(201);
      next();
    }
  } catch (err) {
    console.log(`Unauthorized access! IP: ${reqIp}, Domain: ${reqDomain}`);
    return res.status(401).json({
      error: "Unauthorized access",
      message: "Your IP or domain is not authorized to access this resource.",
    });
  }
};

export { notFound, errorHandler, ipFilter };
