const { validationResult } = require("express-validator");

const validateFields = ( request, response, next ) => {

    const { errors } = validationResult( request );
    if( errors.length !== 0 ) {
        console.log( errors );
        return response.status( 400 ).json( errors );
    }

    next();

};

module.exports = {
    validateFields
}