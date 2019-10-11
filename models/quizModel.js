const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

Schema = mongoose.Schema;

quizSchema = new Schema(
  {
    teacherId: {
      type:Schema.Types.ObjectId,
      ref:'Teacher',
      
    },

    quizTitle: {
      type: String,
      required: true
    },
    
    quizDescr
    : {
      type: String,
      // required: true
    },
    
    
    IsPublished: {
      type: Boolean,
      default: false
    }
    ,
    questions: [{
      type: Object,
      // required: true
    }],
        
    correctAnswerIndex: {
      type: String,
      // required:true
    },
    explanation :{
      type:String,
      // required:true
    }
  },
  { timestamps: true }
);



Quiz = mongoose.model("Quiz", quizSchema);
