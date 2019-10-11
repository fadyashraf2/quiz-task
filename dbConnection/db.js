const mongoose = require("mongoose");
opt = { useUnifiedTopology: true,useNewUrlParser: true ,useCreateIndex:true,useFindAndModify:false} 
mongoose.connect('mongodb+srv://fady:UmtRZiDEjs0BJwzb@task-xh23h.gcp.mongodb.net/test?retryWrites=true&w=majority', opt)
    .then(result=>{
        
    }).catch(err=>{
        console.log(err);
    })
    
    
