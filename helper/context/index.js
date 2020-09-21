const jwt = require('jsonwebtoken');
const { User } = require('../../dist/database/User');
const { getRepository } = require('typeorm');

module.exports.verifyUser = async (req)  => {
    try{
        req.email = null;
        req.loggedInUserId = null;
        const bearerHeader = req.headers.authorization;
        if(bearerHeader){
            const token = bearerHeader.split(' ')[1];
            jwt.verify(token,process.env.JWT_SECRET_KEY || 'challengepuzzle', async ( error, decode ) => {
                req.email = (typeof decode === 'undefined' ? null : decode.email);
                req.loggedInUserId = (typeof decode === 'undefined' ? null : decode.id);
            } );
        }
    }catch(error){
        throw error;
    }
}