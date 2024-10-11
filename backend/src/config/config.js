require("dotenv").config();

module.exports = {
  mongoose: {
    url: process.env.MONGODB_URL,
  },
  port: process.env.PORT,
  env : process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  },
};
