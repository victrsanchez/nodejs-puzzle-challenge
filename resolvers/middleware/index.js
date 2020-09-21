const { skip } = require('graphql-resolvers');
const { getRepository } = require('typeorm');
const { Recipe } = require('../../dist/database/Recipe');
const { User } = require('../../dist/database/User');

module.exports.isAuthenticated = (_,__,{ email }) => {

    if(!email){
        throw new Error('Please login to continue');
    }

    return skip;
}

module.exports.isRecipeOwner = async (_,{ id },{ loggedInUserId }) => {
    try{        
        const recipe = await getRepository(Recipe).findOne({ id });
        if( !recipe ){            
            throw new Error('recipe doesn´t exist');
        }else if( recipe.user.id !== loggedInUserId){
            throw new Error( ' Not authorized as recipe owner ' );
        }
        return skip;
    }catch(error){
        console.log(error);
        throw error;
    }
}