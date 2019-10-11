const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');


const quizController = require('../controllers/quizController');


//================== add new quiz ===========================//
router.post('/addNewQuiz', auth ,quizController.createNewQuiz);


//================== save edited quiz ===========================//
router.post('/edit', auth ,quizController.saveEdited);

//================== delete  quiz ===========================//
router.post('/delete', auth ,quizController.deleteOneQuiz);


//================== GET all Quizzes ===========================//
router.get('/getAllQuizzes', auth ,quizController.getAllQuizzes);

//================== GET all Quizzes ===========================//
router.get('/getOneById/:id', auth ,quizController.getOneById);








module.exports = router