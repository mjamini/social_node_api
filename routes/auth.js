const express = require('express')
const {signup, signin, signout} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const validator = require('../validator');
const router = express.Router();


router.post("/signup", validator.userSignupValidator,signup);
router.post("/signin",signin);
router.get("/signout",signout);
//any route containing userId, our app will first execute userById method
router.param("userId", userById);

module.exports = router;