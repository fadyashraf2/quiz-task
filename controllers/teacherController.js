express = require('express');



// ====================== sign up ======================//
exports.signUp = async (req, res, next) => {
    const newTeacher = new Teacher(req.body);
    try{
        await newTeacher.save();
        const token = await newTeacher.generateAuthToken();

        res.status(201).send({newTeacher,token});
    }catch(e){
        res.status(400).send(e);
    }
    
    
};

// ====================== log in  ======================//
 exports.logIn = async (req,res,next)=>{
    try{
        const teacher = await Teacher.findByCredentials(req.body.email , req.body.password);
        
        const token = await teacher.generateAuthToken();

        res.send({teacher,token});
        
    }catch(e){
        res.status(400).send(e);
        console.log(e);
    }
}

// ====================== log out ======================//
 exports.logOut = async (req,res,next)=>{
    try{
        
        
        req.teacher.tokens = req.teacher.tokens.filter( (token) =>{
            return token.token !== req.token 

        })
        await req.teacher.save()
        res.send();
        
    }catch(e){
        res.status(500).send();
        console.log(e);
    }
}

// ====================== log out from all devices ======================//
 exports.logOutAll = async (req,res,next)=>{
    try{
        req.teacher.tokens = [];
        await req.teacher.save()
        res.send();
        
    }catch(e){
        res.status(500).send();
        console.log(e);
    }
}




