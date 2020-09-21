const { gql } = require('apollo-server-express');

module.exports = gql`
   extend type Query{      
      users : [User!],
   }
 
   extend type Mutation{
      singUp( input : inputSigup!) : User!
      login( input: loginInput ) : Token
   }
 
   input inputSigup{
      name : String!,
      email : String!,
      password : String!      
   }

   input loginInput{
      email : String!,
      password: String!
   }

   type User{
      id : ID!,
      name : String!,
      email : String!      
   }

   type Token{
      Token : String!
   }
`;