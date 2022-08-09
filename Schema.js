const mongoose = require('mongoose');
const validator = require('validator');
const { dbUrl } = require('./routes/DbConfig');

const dbConnect = async () => {
    try {
      await mongoose.connect(
        dbUrl,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: true,
        }
      );
      console.log("DB Connected");
    } catch (e) {
      console.log(e.message, "error in connecting db");
    }
  };

var EmployeeSchema = new mongoose.Schema(
    {
        name:{type:String, default:"User"},
        Employeeid:{type:String,required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique: true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        ctc:{type:Number,required:true},
        password:{
            type:String,
            required:true
        },
        attendnce:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'attendnce',
            default:null
    
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    })

    // user schema

   var AdminSchema = new mongoose.Schema(
    {
        UserName:{
            type:String
        },
        Email:{
            type:String,
            required:true,
            lowercase:true,
            unique: true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        Password:{
            type:String,
            required:true
            

        },
        

    }

   )

   // attendence table for employee schema
   const attendnceSchema= new mongoose.Schema({
    Employeeid:{type:String,required:true,
        unique:true
    },
       Date:{
           type:Date
       },
       atte:[

        {Login:String,
        Logout:String},
    ],
    EmployeeDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'EmployeeDetails'}
   })

   // attendence table for employee schema
   


const EmployeeDetails = mongoose.model('EmployeeDetails',EmployeeSchema);
const AdminDetails = mongoose.model('admin',AdminSchema);
const attendnce = mongoose.model('attendnce',attendnceSchema);

module.exports={EmployeeDetails,AdminDetails,attendnce}