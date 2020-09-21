"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Recipe = void 0;
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var User_1 = require("./User");
var Recipe = /** @class */ (function () {
    function Recipe() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Recipe.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Recipe.prototype, "name");
    __decorate([
        typeorm_1.Column()
    ], Recipe.prototype, "description");
    __decorate([
        typeorm_1.Column()
    ], Recipe.prototype, "ingredients");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Category_1.Category; }, function (category) { return category.recipes; }, {
            eager: true
        }),
        typeorm_1.JoinTable()
    ], Recipe.prototype, "category");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.User; }, function (user) { return user.recipes; }, {
            eager: true
        }),
        typeorm_1.JoinTable()
    ], Recipe.prototype, "user");
    Recipe = __decorate([
        typeorm_1.Entity()
    ], Recipe);
    return Recipe;
}());
exports.Recipe = Recipe;
