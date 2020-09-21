const { gql } = require('apollo-server-express');

module.exports = gql`
   extend type Query{      
      recipes : [Recipe!],
      recipe( id : ID! ): Recipe,
      myRecipes : [Recipe!]
   }

   input createRecipeInput{
      name : String!,
      description : String!,
      ingredients : String!,
      categoryId : ID!
   }

   input updateRecipeInput{
      name : String,
      description : String,
      ingredients : String,
      categoryId : ID
   }

   extend type Mutation{
      createRecipe( input : createRecipeInput!) : Recipe,
      updateRecipe( id : ID!, input : updateRecipeInput ) : Recipe,
      deleteRecipe( id : ID! ) : booleanResponse
   }

   type booleanResponse{
      response : Boolean!
   }
   
   type Recipe{
      id : ID!,
      name : String!,
      ingredients : String!,
      description : String!
      category : Category!
   }
`;