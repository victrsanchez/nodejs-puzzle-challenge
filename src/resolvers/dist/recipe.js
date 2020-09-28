"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var typeorm_1 = require("typeorm");
var User_1 = require("../database/User");
var Recipe_1 = require("../database/Recipe");
var Category_1 = require("../database/Category");
var middleware_1 = require("../middleware");
module.exports = {
    Query: {
        recipes: function (_, __, loggedInUser) { return __awaiter(void 0, void 0, void 0, function () {
            var recipes, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        middleware_1.isAuthenticated(loggedInUser);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, typeorm_1.getRepository(Recipe_1.Recipe).find()];
                    case 2:
                        recipes = _a.sent();
                        return [2 /*return*/, recipes];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        recipe: function (_, _a, loggedInUser) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var recipe, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            middleware_1.isAuthenticated(loggedInUser);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, typeorm_1.getRepository(Recipe_1.Recipe).findOne({ id: id })];
                        case 2:
                            recipe = _b.sent();
                            if (!recipe) {
                                throw new Error('recipe doesn´t exist');
                            }
                            return [2 /*return*/, recipe];
                        case 3:
                            error_2 = _b.sent();
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        myRecipes: function (_, __, loggedInUser) { return __awaiter(void 0, void 0, void 0, function () {
            var loggedInUserId, users, recipes, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        middleware_1.isAuthenticated(loggedInUser);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        loggedInUserId = loggedInUser.loggedInUserId;
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find({ where: { id: loggedInUserId }, relations: ['recipes'] })];
                    case 2:
                        users = _a.sent();
                        if (!users) {
                            throw new Error('you doesn´t have recipes');
                        }
                        recipes = users[0].recipes;
                        return [2 /*return*/, recipes];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        }); }
    },
    Mutation: {
        createRecipe: function (_, _a, loggedInUser) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, categoryId, category, newRecipe, error_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            middleware_1.isAuthenticated(loggedInUser);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ id: loggedInUser.loggedInUserId })];
                        case 2:
                            user = _b.sent();
                            if (!user) {
                                throw new Error('user doesn´t exist');
                            }
                            categoryId = __assign({}, input).categoryId;
                            return [4 /*yield*/, typeorm_1.getRepository(Category_1.Category).findOne({ id: categoryId })];
                        case 3:
                            category = _b.sent();
                            if (!category) {
                                throw new Error('category doesn´t exist');
                            }
                            return [4 /*yield*/, typeorm_1.getRepository(Recipe_1.Recipe).save(__assign(__assign({}, input), { user: user, category: category }))];
                        case 4:
                            newRecipe = _b.sent();
                            return [2 /*return*/, newRecipe];
                        case 5:
                            error_4 = _b.sent();
                            console.log(error_4);
                            throw error_4;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
        updateRecipe: function (_, _a, loggedInUser) {
            var id = _a.id, input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var recipe, data, category, updatedRecipe, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            middleware_1.isAuthenticated(loggedInUser);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, typeorm_1.getRepository(Recipe_1.Recipe).findOne({ id: id })];
                        case 2:
                            recipe = _b.sent();
                            if (!recipe) {
                                throw new Error('recipe doesn´t exist');
                            }
                            else if (recipe.user.id !== loggedInUser.loggedInUserId) {
                                throw new Error(' Not authorized as recipe owner ');
                            }
                            data = __assign({}, input);
                            return [4 /*yield*/, typeorm_1.getRepository(Category_1.Category).findOne({ id: data.categoryId })];
                        case 3:
                            category = _b.sent();
                            if (category) {
                                data.category = category;
                            }
                            delete data.categoryId;
                            return [4 /*yield*/, typeorm_1.getConnection()
                                    .createQueryBuilder()
                                    .update(Recipe_1.Recipe)
                                    .set(data)
                                    .where('id = :id', { id: id })
                                    .execute()];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, typeorm_1.getRepository(Recipe_1.Recipe).findOne({ id: id })];
                        case 5:
                            updatedRecipe = _b.sent();
                            return [2 /*return*/, updatedRecipe];
                        case 6:
                            error_5 = _b.sent();
                            throw error_5;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        deleteRecipe: function (_, _a, loggedInUser) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var recipe, deleted, error_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            middleware_1.isAuthenticated(loggedInUser);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, typeorm_1.getRepository(Recipe_1.Recipe).findOne({ id: id })];
                        case 2:
                            recipe = _b.sent();
                            if (!recipe) {
                                throw new Error('recipe doesn´t exist');
                            }
                            else if (recipe.user.id !== loggedInUser.loggedInUserId) {
                                throw new Error(' Not authorized as recipe owner ');
                            }
                            return [4 /*yield*/, typeorm_1.getRepository(Recipe_1.Recipe).remove(recipe)];
                        case 3:
                            deleted = _b.sent();
                            deleted.id = id;
                            return [2 /*return*/, deleted];
                        case 4:
                            error_6 = _b.sent();
                            throw (error_6);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
    },
    Recipe: {
        category: function (_a) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var recipe, error_7;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, typeorm_1.getRepository(Recipe_1.Recipe).findOne({ id: id })];
                        case 1:
                            recipe = _b.sent();
                            if (!recipe) {
                                throw new Error('recipe doesn´t exist');
                            }
                            return [2 /*return*/, recipe.category];
                        case 2:
                            error_7 = _b.sent();
                            throw error_7;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
    }
};
