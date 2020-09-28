import { gql } from 'apollo-server-express';
import recipe from './recipe';
import category from './category';
import user from './user';
import { DocumentNode } from 'graphql';

const typeDefs : DocumentNode  = gql`
   type Query{      
      _:String
   }
   type Mutation{
       _:String
   }
`;


export = [
    typeDefs,
    user,
    category,
    recipe
];