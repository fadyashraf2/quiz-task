const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

Schema = mongoose.Schema;

questionSchema = new Schema(
  {
    quizId: {
      type:Schema.Types.ObjectId,
      ref:'Quiz', 
       
    },

    question: {
      type: String,
      // required: true
    },
    answers:[{
      type:String,
      // required:true
    }]
    ,
    
    correctAnswerIndex: {
      type: Number,
      // required:true
    },
    explanation :{
      type:String,
      // required:true
    }
  },
  { timestamps: true }
);



Question = mongoose.model("Question", questionSchema);
