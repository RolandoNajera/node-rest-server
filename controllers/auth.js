const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async ( req = request, res = response ) => {

    const { id_token: idToken } = req.body;

    try {
        
        const { name, image, email } = await googleVerify( idToken );
        let user = await User.findOne( { email } );
        if( !user ) {
            const data = {
                name,
                email,
                password: ':P',
                image,
                gmail: true
            };
            user = new User( data );
            await user.save();
        } else if( !user.status ) {
            return res.status( 401 ).json( { message: 'Invalid user' } );
        }

        const token = await generateJWT( user.uuid );
        
        res.json({ user, token });

    } catch( error ) {
        res.status( 400 ).json( 'Invalid google token' );
    }

};

module.exports = {
    login,
    googleSignIn
}
