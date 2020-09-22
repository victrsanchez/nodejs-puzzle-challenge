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
      updateCategory : combineResolvers( isAuthenticated, async (_,{ id , input  }  ) => {

         const { name } = { ...input }

         try{
            const category = await getRepository(Category).findOne( { id } );

            if( !category ){
               throw error( 'category doesn´t exist' );
            }

            category.name =  name;

            const updatedCategory = await getRepository(Category).save(category);

            if(!updatedCategory){
               throw new Error(`The category weren't updated`);
            }

            return updatedCategory;

         }catch( error ){
            throw error;
         }
      } ),
      deleteCategory : combineResolvers( isAuthenticated, async (_,{id})  => {
         try{
            const [ category ] = await getRepository(Category).find( {  where : { id }, relations : ["recipes"]   } );
            if(!category){
               throw new Error(` Category doesn't exist `);
            }else if( category.recipes.length > 0 ){
               throw new Error(` There are recipes related to this category, you can't delete this category! `);
            }
            const deletedCategory = await getRepository(Category).remove(category);
            return deletedCategory;
         }catch(error){
            throw new Error(error);
         }
      })
    }
 };