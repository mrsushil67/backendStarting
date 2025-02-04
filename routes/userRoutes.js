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

router.get('/about',(req, res)=>{
    res.status(200).json({
        message: "My name is Sushil, and I created this backend server using Node.js and Express.js to learn how to deploy applications. After building the server, I deployed it on Vercel to understand the deployment process and how to manage server-side applications in a cloud environment.",
        steps: [
            "npm install -g vercel",
            "vercel login",
            "cd path/to/your/project",
            "create vercel.json in root and write code from google",
            "vercel --prod"
        ]
    });
   
})

module.exports = router;