express = require("express");

// ====================== create new quiz ======================//
exports.createNewQuiz = async (req, res, next) => {
  try {
    
    const newQuiz = new Quiz(req.body);
    newQuiz.teacherId = req.user._id;
    await newQuiz.save();
    res.send(newQuiz);
  } catch(e) {
    console.log(e)
    res.send(e);
  }
}

// ====================== save Edited quiz ======================//
exports.saveEdited = async (req, res, next) => {
  try {
    
    const newQuiz = req.body;
    // newQuiz.teacherId = req.user._id;
    const test = await Quiz.findByIdAndUpdate(req.body._id, newQuiz)
    res.send(test);
  } catch(e) {
    console.log(e)
    res.send(e);
  }
}


// ====================== GET all Quizzes ======================//
exports.getAllQuizzes = async (req, res, next) => {
  try {
    const teacherId = req.user._id;
    const quizzes =await Quiz.find({teacherId})
    res.send(quizzes);
  } catch(e) {
    console.log(e)
    res.send(e);
  }
}

// ====================== GET one quiz by ID======================//
exports.getOneById = async (req, res, next) => {
  try {
    const ID = req.params.id;
    console.log(ID)
    const quiz =await Quiz.findById(ID);
    res.send(quiz);
  } catch(e) {
    console.log(e)
    res.send(e);
  }
}

// ====================== delete one quiz======================//
exports.deleteOneQuiz = async (req, res, next) => {
  try {
    const ID = req.body.id;
    console.log(ID)
    const quiz =await Quiz.findByIdAndDelete(ID);
    res.send(quiz);
  } catch(e) {
    console.log(e)
    res.send(e);
  }

}

