"use strict";

var express = require('express');

var _require = require("apollo-server-express"),
    ApolloServer = _require.ApolloServer;

var cors = require('cors');

var dotEnv = require('dotenv');

var _require2 = require('typeorm'),
    createConnection = _require2.createConnection;

var reflectMetadata = require('reflect-metadata');

var typeDefs = require('./typeDefs');

var resolvers = require('./resolvers');

var _require3 = require('./helper/context'),
    verifyUser = _require3.verifyUser;

createConnection(); //set env variables

dotEnv.config();
var PORT = process.env.PORT || 3000; //init server

var app = express(); //set up cors

app.use(cors()); //body parse middleware

app.use(express.json()); //init apollo server

var apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: function context(_ref) {
    var req;
    return regeneratorRuntime.async(function context$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref.req;
            _context.next = 3;
            return regeneratorRuntime.awrap(verifyUser(req));

          case 3:
            return _context.abrupt("return", {
              email: req.email,
              loggedInUserId: req.loggedInUserId
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
});
apolloServer.applyMiddleware({
  app: app,
  path: '/api'
});
app.use('/', function (req, res, next) {
  res.send({
    message: 'Hello world.... nodejs puzle challenge 18-09-2020'
  });
});
app.listen(PORT, function () {
  console.log("Server listening on PORT ".concat(PORT, " VASH"));
});