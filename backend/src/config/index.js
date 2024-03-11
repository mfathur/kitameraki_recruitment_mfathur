export default {
  development: {
    port: 3000,
    corsHeader: ["Link", "Content-Disposition"],
    corsOrigin: "*",
    corsAllowedMethods: ["GET", "PUT", "DELETE", "POST"],
  },
};
