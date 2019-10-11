express = require("express");

// ====================== create New Question ======================//
exports.createNewQuestion = async (req, res, next) => {
  
  try{
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).send();
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
}


//=========================== insert many questions ======================//
exports.createNewQuestion = async (req, res, next) => {
  
  try{
    const questions = req.body;
    await insertMany(questions,(err,docs)=>{
      res.send(docs)
    });
    
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
  
}
//=========================== update  questions ======================//
/* exports.updateQuestion = async (req, res, next) => {
  
  try{
    const questions = req.body;
    const quiz = Quiz.findByI(req.body.quizId
    await insertMany(questions,(err,docs)=>{
      res.send(docs)
    });
    
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }

}
 */





