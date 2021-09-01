const { response, request } = require("express");

const validateAdminRole = ( req = request, res = response, next ) => {

    if( !req.user ) {
        return res.status( 500 ).json( { message: 'Validate token before role.'} );
    }
    
    const { role, name } = req.user;
    if( role !== 'ADMIN_ROLE') {
        return res.status( 403 ).json( { message: 'Permission denied.' } );
    }

    next();
};

const hasRole = ( ...roles ) => {

    return ( req, res, next ) => {
        
        if( !req.user ) {
            return res.status( 500 ).json( { message: 'Validate token before role.'} );
        }

        if( !roles.includes( req.user.rol ) ) {
            return res.status( 400 ).json( { message: `roles allowed ${ roles }` } );
        }

        next();
    };

};

module.exports = {
    validateAdminRole,
    hasRole
}
