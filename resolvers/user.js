const { getRepository } = require('typeorm');
const { User } = require ('../dist/database/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    Query : {
        users : async () => {
            try{
                const repository = getRepository(User);
                const users = await repository.find();
                return users;
            }catch(error){
                console.log('error users',error);
            }       
        }        
    },
    Mutation:{
        singUp : async (_,{ input }) => {
            try{
                const repository = getRepository(User);
                const user = await repository.findOne({ email : input.email });
                if( user ){
                    throw new Error('Email already in use');
                }
                const hashedPassword = await bcryptjs.hash(input.password,12);
                const result = await repository.save({...input,password : hashedPassword});
                return result;
            }catch(error){
                throw error;
            }
        },
        login : async (_,{ input }) => {
            try{                
                const repository = getRepository(User);
                const user = await repository.findOne( { email : input.email } );
                if( !user ){
                    throw new Error('Invalid user or password');
                }

                const isPasswordValid = await bcryptjs.compare(input.password,user.password);

                if(!isPasswordValid){
                    throw new Error('Invalid user or password');
                }
                
                const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
                const Token =  await jwt.sign({ id : user.id, email: user.email },secret,{ expiresIn : '1d' });
                return { Token };
            }catch(error){
                throw error;
            }
        }
   },
 };