"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var recipe_1 = __importDefault(require("./recipe"));
var category_1 = __importDefault(require("./category"));
var user = require("./user");
module.exports = [
    user,
    category_1.default,
    recipe_1.default
];
