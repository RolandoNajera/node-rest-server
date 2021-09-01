const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUser = async (request, response) => {

    const { limit = 5, from = 0 } = request.query;
    const query = { status: true };


    const [ users, total ] = await Promise.all([
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
        User.countDocuments(query)
    ]);

    response.json( { total, users } );
};

const postUser = async (request, response) => {

    const { name, email, password, role } = request.body;
    const user = new User({ name, email, password, role });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    response.json(user);
};

const putUser = async (request, response) => {
    const id = request.params.id;
    const { password, google, email, ...user } = request.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    }

    const userUpdated = await User.findByIdAndUpdate(id, user);

    response.json(user);
};

const deleteUser = async (request, response) => {
    const id = request.params.id;
    const user = await User.findByIdAndUpdate( id, { status: false } );

    response.json( user );
};

const patchUser = (request, response) => {
    response.json({ message: 'PATCH API - Controller' });
};

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
    patchUser
}
