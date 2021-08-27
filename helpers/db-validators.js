const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async( role = '' ) => {

    const existRole = await Role.findOne( { role } );
    if( !existRole ) {
        throw new Error(`Role <<${ role }>> is not valid.`);
    }
};

const existEmail = async ( email = '' ) => {

    const existEmail = await User.findOne( { email } );
    if( existEmail ) {
        throw new Error(`Email <<${ email }>> already exist.`);
    }

};

const existUserId = async ( id ) => {

    const existId = await User.findById( id );
    if( !existId ) {
        throw new Error(`Id: <<${ id }>> is not valid.`);
    }
};

module.exports = {
    isValidRole,
    existEmail,
    existUserId
}