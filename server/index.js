require("dotenv").config();
const express = require("express");
const server = express();
const session = require("express-session");

const usersAPI = require("./api/user.router");

const sessionConfig = {
  name: process.env.EXPRESS_SESSION_NAME,
  secret: process.env.EXPRESS_SESSION_SECRET,
  cookie: {
    masxAge: 1000 * 60 * 60 * 4, // 4 Hours
    secure: false, // Should be true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false, // GDPR laws against setting cookies automatically
};

server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/users", usersAPI);

module.exports = server;
