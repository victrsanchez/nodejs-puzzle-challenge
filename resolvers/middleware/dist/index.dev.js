"use strict";

var _require = require('graphql-resolvers'),
    skip = _require.skip;

var _require2 = require('typeorm'),
    getRepository = _require2.getRepository;

var _require3 = require('../../dist/database/Recipe'),
    Recipe = _require3.Recipe;

var _require4 = require('../../dist/database/User'),
    User = _require4.User;

module.exports.isAuthenticated = function (_, __, _ref) {
  var email = _ref.email;

  if (!email) {
    throw new Error('Please login to continue');
  }

  return skip;
};

module.exports.isRecipeOwner = function _callee(_, _ref2, _ref3) {
  var id, loggedInUserId, recipe;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = _ref2.id;
          loggedInUserId = _ref3.loggedInUserId;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(getRepository(Recipe).findOne({
            id: id
          }));

        case 5:
          recipe = _context.sent;

          if (recipe) {
            _context.next = 10;
            break;
          }

          throw new Error('recipe doesn´t exist');

        case 10:
          if (!(recipe.user.id !== loggedInUserId)) {
            _context.next = 12;
            break;
          }

          throw new Error(' Not authorized as recipe owner ');

        case 12:
          return _context.abrupt("return", skip);

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          throw _context.t0;

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 15]]);
};