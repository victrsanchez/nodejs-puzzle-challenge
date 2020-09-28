import { getConnection, getRepository } from 'typeorm';
import { Category } from '../database/Category';
import { isAuthenticated } from '../middleware';

export = {
    Query : {
      categories : async( _: any , __: any , loggedUser : any) => {
         try{
            isAuthenticated( loggedUser );
            const categories = await getRepository(Category).find();
            return categories;
         }catch(error){
            console.log(error);
            throw error;
         }
      },
      category : async  (_ : any , { name } : { name : any }, loggedUser : any ) => {
         try {
            isAuthenticated( loggedUser );
            const result = await getRepository( Category ).findOne( { name });
            return result;
         } catch (error) {
            throw error;
         }
      }
    },
    Mutation : {
      createCategory : async (_ : any,{ input } : { input : any }, loggedUser : any) => {
         try {
            isAuthenticated( loggedUser );
            const category = await getRepository(Category).findOne({ name : input.name });
            if(category){
               throw new Error('category already exist');
            }
            const result = await getRepository(Category).save( { ...input });
            return result;
         } catch (error) {
            throw error;
         }
      },
      updateCategory : async (_ : any ,{ id , input  } : { id : number, input : any }, loggedUser : any ) => {

         isAuthenticated(loggedUser);

         try{
            const category = await getRepository(Category).findOne( { id } );

            if( !category ){
               throw new Error( `category doesn't exist` );
            }

            await getConnection()
                  .createQueryBuilder()
                  .update(Category)
                  .set( { ...input }  )
                  .where( 'id = :id', { id } )
                  .execute();

            const result = await getRepository(Category).findOne( { id } );
            return result;

         }catch( error ){
            throw error;
         }
      },
      deleteCategory : async (_ : any ,{ id } : { id : number }, loggedUser :  any )  => {
         isAuthenticated(loggedUser);
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
      }
    }
 };