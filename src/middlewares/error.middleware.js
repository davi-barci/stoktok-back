import httpStatus from "http-status";

const errorStatusCodes = {
  UnauthorizedError: httpStatus.UNAUTHORIZED,
  NotFoundError: httpStatus.NOT_FOUND,
  ConflictError: httpStatus.CONFLICT,
  UnprocessableEntityError: httpStatus.UNPROCESSABLE_ENTITY,
};

function errorMiddleware(err, _req, res, _next) {
  const response = err.message || "Internal Server Error";
  const statusCode = errorStatusCodes[err.name] || httpStatus.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).send(response);
}

export default errorMiddleware;