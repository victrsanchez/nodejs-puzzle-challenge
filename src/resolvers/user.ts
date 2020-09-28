import { getRepository } from 'typeorm';
import bcryptjs from  'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../database/User';
import { validateEmailAndPassword } from '../middleware';


export = {
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
        singUp : async (_ : any ,{ input } : { input : any }) => {
            try{
                validateEmailAndPassword( { input } );
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
        login : async (_ : any,{ input } : { input : any }) => {
            try{                
                validateEmailAndPassword( { input } );
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