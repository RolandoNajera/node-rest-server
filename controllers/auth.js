const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne( { email } );
        if( !user ) {
            res.status( 400 ).json( { message: 'User or password invalid.' } );
        }
        if( !user.status ) {
            res.status( 400 ).json( { message: 'User or password invalid.' } );
        }
        const validPassword = bcrypt.compareSync( password, user.password );
        if( !validPassword ) {
            res.status( 400 ).json( { message: 'User or password invalid.' } );
        }
        const token = await generateJWT( user.id );
        res.json( { token } );

    } catch( error ) {
        console.log( error );
        return res.status(500).json({
            message: 'Something wrong hapenned.'
        });
    }

};

module.exports = {
    login
}
