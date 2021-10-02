require("dotenv").config();

const config = {
  ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET,
};

module.exports = config;
