const express = require('express');
const router = new express.Router();


const techearController = require('../controllers/teacherController');


//================== sign up ===========================//
router.post('/teacher/signup',techearController.signUp);


router.post('/teacher/login',techearController.logIn);





module.exports = router