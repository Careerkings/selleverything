const errorHandler = (message, statusCode) => {
  const error = new Error();
  error.message = message;
  error.statusCode = statusCode;
  return error;
};

export default errorHandler;

/*
// middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // 🔹 Handle Mongoose bad ObjectId (CastError)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // 🔹 Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // 🔹 Handle MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue);
    message = `Duplicate value for field: ${field}. Please use another value.`;
  }

  // 🔹 Log full details for debugging
  console.error("🔥 Error caught:", {
    message: err.message,
    stack: err.stack,
    statusCode,
  });

  // 🔹 Response object
  const response = {
    success: false,
    message,
    statusCode,
  };

  // Only show stack in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorMiddleware;*/
