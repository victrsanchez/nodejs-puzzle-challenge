"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var apollo_server_express_1 = require("apollo-server-express");
var templateObject_1;
module.exports = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n   extend type Query{      \n      users : [User!],\n   }\n \n   extend type Mutation{\n      singUp( input : inputSigup!) : User!\n      login( input: loginInput ) : Token\n   }\n \n   input inputSigup{\n      name : String!,\n      email : String!,\n      password : String!      \n   }\n\n   input loginInput{\n      email : String!,\n      password: String!\n   }\n\n   type User{\n      id : ID!,\n      name : String!,\n      email : String!      \n   }\n\n   type Token{\n      Token : String!\n   }\n"], ["\n   extend type Query{      \n      users : [User!],\n   }\n \n   extend type Mutation{\n      singUp( input : inputSigup!) : User!\n      login( input: loginInput ) : Token\n   }\n \n   input inputSigup{\n      name : String!,\n      email : String!,\n      password : String!      \n   }\n\n   input loginInput{\n      email : String!,\n      password: String!\n   }\n\n   type User{\n      id : ID!,\n      name : String!,\n      email : String!      \n   }\n\n   type Token{\n      Token : String!\n   }\n"])));
