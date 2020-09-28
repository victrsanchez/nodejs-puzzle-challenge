import { getRepository, getConnection } from 'typeorm';

import { User } from '../database/User';
import { Recipe } from '../database/Recipe'
import { Category } from '../database/Category';
import { isAuthenticated } from '../middleware';


export  = {
   Query : {
      recipes :  async(_: any, __ : any, loggedInUser : any) => {
         isAuthenticated(loggedInUser);
         try{
            const recipes = await getRepository(Recipe).find();
            return recipes;
         }catch(error){
            throw error;
         }      
      },
      recipe : async  (_ : any,{ id } : { id : any }, loggedInUser : any) => {
         isAuthenticated(loggedInUser);
         try {            
            const recipe = await getRepository(Recipe).findOne({ id });
            if(!recipe){
               throw new Error('recipe doesn´t exist');
            }
            return recipe;
         } catch (error) {
            throw error;
         }
      },
      myRecipes : async (_ : any,__ : any,loggedInUser : any)=>{
         isAuthenticated(loggedInUser);
         try{
            const loggedInUserId = loggedInUser.loggedInUserId;
            const users = await getRepository(User).find({ where : {id : loggedInUserId} , relations : ['recipes'] });
            if(!users){
               throw new Error('you doesn´t have recipes');
            }
            const [ {recipes} ]  = users;            
            return recipes;
         }catch(error){
            throw error;
         }
      }
   },
   Mutation:{
      createRecipe : async (_ : any,{ input } : {input : any}, loggedInUser : any ) => {
         isAuthenticated(loggedInUser);
         try{
            const user = await getRepository(User).findOne({ id : loggedInUser.loggedInUserId });
            if(!user){
               throw new Error('user doesn´t exist');
            }
            const { categoryId } : {categoryId : any} = { ...input };
            const category = await getRepository(Category).findOne({ id : categoryId });            
            
            if( !category ){
               throw new Error('category doesn´t exist');
            }
            const newRecipe = await getRepository(Recipe).save( {...input, user, category } );
            return newRecipe;

         }catch(error){
            console.log(error);
            throw error;
         }
      },
      updateRecipe : async(_ : any ,{ id, input } : { id : any, input : any }, loggedInUser : any) => {

         isAuthenticated(loggedInUser);

         try{

            const recipe = await getRepository(Recipe).findOne({ id });
            if( !recipe ){            
                  throw new Error('recipe doesn´t exist');
            }else if( recipe.user.id !== loggedInUser.loggedInUserId){
                  throw new Error( ' Not authorized as recipe owner ' );
            }

            const data = { ...input };
            const category = await getRepository(Category).findOne( { id : data.categoryId }  );

            if(category){
               data.category = category;
            }
            
            delete data.categoryId;

            await getConnection()
                  .createQueryBuilder()
                  .update(Recipe)
                  .set( data  )
                  .where( 'id = :id', { id } )
                  .execute();

            const updatedRecipe = await getRepository(Recipe).findOne({ id });

            return updatedRecipe;
         }catch(error){
            throw error;
         }
         
      },
      deleteRecipe : async (_ : any,{ id } : { id : any }, loggedInUser : any) => {
         isAuthenticated(loggedInUser);
         try{

            const recipe = await getRepository(Recipe).findOne({ id });
            if( !recipe ){            
                  throw new Error('recipe doesn´t exist');
            }else if( recipe.user.id !== loggedInUser.loggedInUserId){
                  throw new Error( ' Not authorized as recipe owner ' );
            }
                       
            const deleted = await getRepository(Recipe).remove(recipe);
            
            deleted.id = id;

            return deleted;
            
         }catch(error){
            throw( error );
         }
      }
   },
   Recipe : {
      category : async ({ id } :  { id : any } ) => {
         try{
            const recipe = await getRepository(Recipe).findOne({ id });
            if(!recipe){
               throw new Error('recipe doesn´t exist');
            }
            return recipe.category;
         }catch(error){
            console.log(error);
            throw error;
         }
         
      }
   }
 };
