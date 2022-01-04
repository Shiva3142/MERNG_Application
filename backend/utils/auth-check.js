const {
    AuthenticationError
} = require('apollo-server-express')

const jwt = require('jsonwebtoken');
const {SECRET_KEY}=require('../config.js')

async function checkAuth(context) {
    let authHeader = context.req.headers.authorization;
    if (authHeader) {
        try {
            let user = jwt.verify(authHeader, SECRET_KEY);
            return user
        } catch (error) {
            console.log(error);
            throw new AuthenticationError('Invalid/Expired Tocken',{errors:{
                token:"Please Login First"
            }
            })
        }
    }
    throw new AuthenticationError('Authentication Header Must be provided',{
        errors:{
            header:"Please Login First"
        }
    })
}

module.exports={checkAuth}