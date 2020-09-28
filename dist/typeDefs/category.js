"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var apollo_server_express_1 = require("apollo-server-express");
var templateObject_1;
module.exports = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n   extend type Query{      \n      categories : [Category!],\n      category( name : String! ): Category \n   }\n\n   input inputCreateCategory{\n      name : String!\n   }\n\n   extend type Mutation{\n      createCategory( input : inputCreateCategory! ) : Category,\n      updateCategory( id : ID!,  input : inputCreateCategory! ) : Category\n      deleteCategory( id : ID! ) : Category\n   }\n\n   type Category{\n      id : ID,\n      name : String!      \n   }\n"], ["\n\n   extend type Query{      \n      categories : [Category!],\n      category( name : String! ): Category \n   }\n\n   input inputCreateCategory{\n      name : String!\n   }\n\n   extend type Mutation{\n      createCategory( input : inputCreateCategory! ) : Category,\n      updateCategory( id : ID!,  input : inputCreateCategory! ) : Category\n      deleteCategory( id : ID! ) : Category\n   }\n\n   type Category{\n      id : ID,\n      name : String!      \n   }\n"])));
