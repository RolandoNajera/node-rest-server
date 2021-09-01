const jwt = require('jsonwebtoken');

const generateJWT = ( uuid = '' ) => {

    return new Promise( ( resolve, reject ) => {
        const payload = { uuid };
        jwt.sign( payload, process.env.SECRETKEY, { 
            expiresIn: '4h'
         }, ( err, token ) => {
             if( err ) {
                 console.log( err );
                 reject( 'Could not generate token' );
             } else {
                 resolve( token );
            }
         });
    });

};

module.exports = {
    generateJWT
}