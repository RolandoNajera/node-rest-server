const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => {
    
    const token = req.header( 'x-token' );
    if( !token ) {
        res.status( 401 ).json( { message: 'Invalid token' } );
    }

    try {
        const { uuid } = jwt.verify( token, process.env.SECRETKEY );
        req.uuid = uuid;
        const user = await User.findById( { _id: uuid } );
        if( !user ) {
            return res.status( 401 ).json( { message: 'Invalid token - user does not exist.' } );
        }
        if( !user.status ) {
            return res.status( 401 ).json( { message: 'Invalid token - status false' } );
        }
        req.user = user;
        next();
    } catch ( error ) {
        console.log( error );
        res.status( 401 ).json( { message: 'Invalid token' } );
    }


};

module.exports = {
    validateJWT
}