const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, putUser, postUser, deleteUser, patchUser } = require('../controllers/user');
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, existEmail, existUserId } = require('../helpers/db-validators');

const router =  Router();

router.get( '/', getUser );

router.put( '/:id', [
    check('id', 'Is not a valid ID').isMongoId().custom( existUserId ),
    check('role').custom( isValidRole ),
    validateFields
], putUser );

router.post( '/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('password', 'Password muts have at least 6 characters.').not().isEmpty().isLength( { min: 6 } ),
    check('email', 'Email not valid.').isEmail().custom( existEmail ),
    check('role').custom( isValidRole ),
    validateFields
], postUser );

router.delete( '/:id', deleteUser );

router.patch( '/', patchUser );

module.exports = router;