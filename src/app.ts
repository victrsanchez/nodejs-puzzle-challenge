import  express from "express";
import { ApolloServer } from  "apollo-server-express";
import cors from "cors";
import dotEnv from "dotenv";
import { createConnection } from 'typeorm';
import reflectMetadata from 'reflect-metadata';

import typeDefs from './typeDefs';
import resolvers from  './resolvers';
import { verifyUser } from './helper';

createConnection();

//set env variables
dotEnv.config();
const PORT = process.env.PORT || 3000;

//init server
const app = express();


//set up cors
app.use(cors());
//body parse middleware
app.use(express.json());

//init apollo server
const apolloServer = new ApolloServer({
   typeDefs,
   resolvers,
   context : async ({ req } : { req : any }) => {
      await verifyUser(req);
      return {
         email : req.email,
         loggedInUserId : req.loggedInUserId
      }
   }
});


apolloServer.applyMiddleware({ app, path : '/api' });

app.use('/',( _: any, res : any , __: any) => {
   res.send({ message : 'Hello world.... nodejs puzle challenge' }) ;
});

app.listen(PORT, () => {
   console.log(`Server listening on PORT ${PORT}`); 
});
