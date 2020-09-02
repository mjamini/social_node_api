const express = require('express')
const {requireSignin} = require('../controllers/auth')
const {
    userById, 
    allUsers, 
    getUser, 
    updateUser, 
    deleteUser,
    userPhoto    
} = require('../controllers/user')
//const validator = require('../validator');
const router = express.Router();



router.get("/users",allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);
router.get("/user/photo/:userId", userPhoto);
//any route containing userId, our app will first execute userById method
router.param("userId", userById);

module.exports = router;