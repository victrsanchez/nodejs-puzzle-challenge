const express  = require('express');
const { ApolloServer} = require( "apollo-server-express");
const cors = require('cors');
const dotEnv = require('dotenv');
const {createConnection} = require( 'typeorm');
const reflectMetadata = require('reflect-metadata');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { verifyUser } = require('./helper/context')

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
   context : async ({ req }) => {
      await verifyUser(req);
      return {
         email : req.email,
         loggedInUserId : req.loggedInUserId
      }
   }
});


apolloServer.applyMiddleware({ app, path : '/api' });

app.use('/',(req,res,next) => {
   res.send({ message : 'Hello world.... nodejs puzle challenge' }) ;
});

app.listen(PORT, () => {
   console.log(`Server listening on PORT ${PORT}`); 
});
