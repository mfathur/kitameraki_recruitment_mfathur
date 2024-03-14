export default {
  development: {
    port: 3000,
    corsHeader: ["Link", "Content-Disposition"],
    corsOrigin: "http://localhost:5173",
    corsAllowedMethods: ["GET", "PUT", "DELETE", "POST"],
  },
};
