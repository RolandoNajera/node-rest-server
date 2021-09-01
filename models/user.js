const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    gmail: {
        type: Boolean,
        default: false
    }

});

UserSchema.methods.toJSON = function() {

    const { __v, password, _id, ...user } = this.toObject();
    user.id = _id;
    return user;

};

module.exports = model( 'User', UserSchema );