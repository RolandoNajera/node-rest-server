const { response } = require('express');

const getUser = ( request, response ) => {
    const { page = 1, limit = 10 } = request.query;
    response.json( { message: 'GET API - Controller', page, limit } );
};

const postUser = ( request, response ) => {
    const { name, age } = request.body;
    response.json( { message: 'POST API - Controller', name, age } );
};

const putUser = ( request, response ) => {
    const id = request.params.id;
    response.json( { message: 'PUT API - Controller', id } );
};

const deleteUser = ( request, response ) => {
    response.json( { message: 'DELETE API - Controller' } );
};

const patchUser = ( request, response ) => {
    response.json( { message: 'PATCH API - Controller' } );
};

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
    patchUser
}
