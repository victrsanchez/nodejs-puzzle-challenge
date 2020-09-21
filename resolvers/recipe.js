const { getRepository } = require('typeorm');
const { User } = require('../dist/database/User');
const { Recipe } = require ('../dist/database/Recipe');
const { Category } = require('../dist/database/Category');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated, isRecipeOwner } = require('./middleware');

module.exports = {
   Query : {
      recipes : combineResolvers(isAuthenticated,async() => {
         try{
            const recipes = await getRepository(Recipe).find();
            return recipes;
         }catch(error){
            throw error;
         }      
      }),
      recipe : combineResolvers(isAuthenticated,async  (_,{ id }) => {
         try {            
            const recipe = await getRepository(Recipe).findOne({ id });
            if(!recipe){
               throw new Error('recipe doesn´t exist');
            }
            return recipe;
         } catch (error) {
            throw error;
         }
      }),
      myRecipes : combineResolvers( isAuthenticated, async (_,__,{ email, loggedInUserId })=>{
         try{
            const users = await getRepository(User).find({ where : {id : loggedInUserId} , loggedInUserId, relations : ['recipes'] });
            if(!users){
               throw new Error('you doesn´t have recipes');
            }
            const [ {recipes} ]  = users;            
            return recipes;
         }catch(error){
            throw error;
         }
      })
   },
   Mutation:{
      createRecipe : combineResolvers(isAuthenticated,async (_,{ input }, { email }) => {

         
         try{
            const user = await getRepository(User).findOne({ email });
            if(!user){
               throw new Error('user doesn´t exist');
            }
            const { categoryId } = { ...input };
            const category = await getRepository(Category).findOne({ id : categoryId });
            if(!categoryId){
               throw new Error('category doesn´t exist');
            }
            const newRecipe = await getRepository(Recipe).save( {...input, user, category } );
            return newRecipe;

         }catch(error){
            console.log(error);
            throw error;
         }
      }),
      updateRecipe : combineResolvers(isAuthenticated,isRecipeOwner,async(_,{ id, input }) => {
         try{
            const updatedRecipe = await getRepository(Recipe).save({  id, ...input });
            if(!updatedRecipe){
               throw new Error(' Recipe weren´t updated ');
            }
            return updatedRecipe;
         }catch(error){
            throw error;
         }
         
      }),
      deleteRecipe : combineResolvers( isAuthenticated, isRecipeOwner, async (_,{ id }) => {
         try{
            const recipe = await getRepository(Recipe).findOne({ id });
            const deletedRecipe = await getRepository(Recipe).remove(recipe);

            const response = ( deletedRecipe ? true : false );

            return { response };
         }catch(error){
            throw( error );
         }
      })
   },
   Recipe : {
      category : async ({ id }) => {
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