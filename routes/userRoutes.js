const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticatedUser = require('../middlewares/authmiddleware');
const {check} = require('express-validator');

router.post('/register',
    check('name').not().isEmpty().withMessage("name is required"),
    check('role').not().isEmpty().withMessage("role is required"),
    check('email').isEmail().withMessage("email is required"),
    check('password').isLength({min:6}).withMessage("password is required")
    ,userController.userRegister);

router.post('/login',
    check('email').isEmail().withMessage("email is required"),
    check('password').isLength({min:6}).withMessage("password is required")
    ,userController.userLogin);

router.get('/profile',authenticatedUser,userController.userProfile);

router.get('/logout',authenticatedUser,userController.userLogout);

module.exports = router;