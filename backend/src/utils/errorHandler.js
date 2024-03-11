const errorHandler = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  const errorMessage =
    errorCode === 500
      ? "internal server error"
      : err.message || "something went wrong";

  res.status(errorCode).json({
    success: false,
    message: errorMessage,
  });
};

export default errorHandler;
