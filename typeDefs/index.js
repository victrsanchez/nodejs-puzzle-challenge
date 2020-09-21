const { gql } = require('apollo-server-express');
const recipe = require('./recipe');
const category = require('./category');
const user = require('./user');

const typeDefs = gql`
   type Query{      
      _:String
   }
   type Mutation{
       _:String
   }
`;


module.exports = [
    typeDefs,
    recipe,
    user,
    category
];