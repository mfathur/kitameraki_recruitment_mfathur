const errorLogger = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";

  console.error({
    errorCode: errorCode,
    errorMessage: errorMessage,
    stack: err.stack ? err.stack : {},
  });

  next(err);
};

export default errorLogger;
