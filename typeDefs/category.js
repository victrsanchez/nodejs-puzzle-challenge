const { gql } = require('apollo-server-express');

module.exports = gql`

   extend type Query{      
      categories : [Category!],
      category( name : String! ): Category 
   }

   input inputCreateCategory{
      name : String!
   }

   extend type Mutation{
      createCategory( input : inputCreateCategory! ) : Category,
      deleteCategory( id : ID! ) : Category
   }

   type Category{
      id : ID!,
      name : String!      
   }
`;