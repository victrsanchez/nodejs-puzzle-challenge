
export const isAuthenticated = ({ email } : { email : String }) => {
    if(!email){
        throw new Error('Please login to continue');
    }
}

export const validateEmailAndPassword = ( { input } : { input : any } ) => {

    try{
        const { email , password  } : { email : any, password : any } = { ...input };
        const emailtPattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(!emailtPattern.test(email)){
            throw new Error('Invalid email format');
        }
        if( password.length < 1 ){
            throw new Error('The password cannot be empty');
        }
    }catch(error){
        throw error;
    }
}
