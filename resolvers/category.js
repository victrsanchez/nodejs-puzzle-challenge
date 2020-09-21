const { getRepository } = require('typeorm');
const { Category } = require ('../dist/database/Category');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./middleware');


module.exports = {
    Query : {
      categories : combineResolvers(isAuthenticated,async() => {
         try{
            const categories = await getRepository(Category).find();
            return categories;
         }catch(error){
            console.log(error);
            throw error;
         }
      }),
      category : combineResolvers( isAuthenticated ,async  (_, { name } ) => {
         try {
            const result = await getRepository( Category ).findOne({ name : name });
            return result;
         } catch (error) {
            throw error;
         }
      })
    },
    Mutation : {
      createCategory : combineResolvers( isAuthenticated , async (_,{ input }) => {
         try {
            const category = await getRepository(Category).findOne({ name : input.name });
            if(category){
               throw new Error('category already exist');
            }
            const result = await getRepository(Category).save( { ...input });
            return result;
         } catch (error) {
            throw error;
         }
      }),
      deleteCategory : combineResolvers( isAuthenticated, async (_,{id})  => {
         try{
            const category = getRepository(Category).findOne( { id } )

            if(!category){
               
            }


         }catch(error){

         }
      })
    }
 };