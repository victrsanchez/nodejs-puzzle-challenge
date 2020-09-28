import jwt from 'jsonwebtoken';

export const verifyUser = async (req : any)  => {
    try{
        req.email = null;
        req.loggedInUserId = null;
        const bearerHeader = req.headers.authorization;
        if(bearerHeader){
            const token = bearerHeader.split(' ')[1];
            jwt.verify(token,process.env.JWT_SECRET_KEY || 'challengepuzzle', async ( error : any, decode : any ) => {
                req.email = (typeof decode === 'undefined' ? null : decode.email);
                req.loggedInUserId = (typeof decode === 'undefined' ? null : decode.id);
            } );
        }
    }catch(error){
        throw error;
    }
}