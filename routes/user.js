const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, putUser, postUser, deleteUser, patchUser } = require('../controllers/user');
const { isValidRole, existEmail, existUserId } = require('../helpers/db-validators');

const { validateFields, validateJWT, validateAdminRole, hasRole } = require('../middlewares')

const router = Router();

router.get('/', getUser);

router.put('/:id', [
    check('id', 'Is not a valid ID').isMongoId().custom(existUserId),
    check('role').custom(isValidRole),
    validateFields
], putUser);

router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('password', 'Password muts have at least 6 characters.').not().isEmpty().isLength({ min: 6 }),
    check('email', 'Email not valid.').isEmail().custom(existEmail),
    check('role').custom(isValidRole),
    validateFields
], postUser);

router.delete('/:id', [
    validateJWT,
    hasRole( 'ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'Is not a valid ID').isMongoId().custom(existUserId),
    validateFields
], deleteUser);

router.patch('/', patchUser);

module.exports = router;