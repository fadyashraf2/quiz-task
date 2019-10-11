const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')








TeacherSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    tokens :[{
        token:{
            type:String,
            required:true
        }
        
    }]
    
    

},{timestamps:true})





//============= for tokens ===========================//
TeacherSchema.methods.generateAuthToken = async function () {
    
    const teacher =this ;
    const token = await jwt.sign({_id: teacher._id.toString()},'tokenKey');

    teacher.tokens = await teacher.tokens.concat({token})
    await teacher.save(); 
    return token
}



//=============== for hash password ===============//
TeacherSchema.pre('save',async function(next){
    const teacher =this 
    if(teacher.isModified('password')){
        teacher.password = await bcrypt.hash(teacher.password,8)
    }
    next();

})




//============== for login =======================///
TeacherSchema.statics.findByCredentials = async(email,password)=>{
    const teacher = await Teacher.findOne({ email }); 
    if(!teacher) {
        throw new Error('unable to login')
    }
          
    const isMatch = await bcrypt.compare( password ,teacher.password);
    
    if(!isMatch){
        throw new Error('unable to login ')
    }
    return teacher
    
}

Teacher = mongoose.model('Teacher',TeacherSchema);
