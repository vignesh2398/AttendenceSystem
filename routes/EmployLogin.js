var express = require('express');
var router = express.Router();
const { EmployeeDetails, AdminDetails, attendnce } = require('../Schema');
const mongoose = require('mongoose');
const { dbUrl } = require('./DbConfig');
const { hashcompare, createJWT, authVerify, hashing } = require('../auth');

mongoose.connect(dbUrl)
const toId= mongoose.Types.ObjectId
// creating employee collection and attendence collection
router.post('/register', async(req,res)=>{
  try {

    const empuser= await EmployeeDetails.findOne({email:req.body.email})
    if(empuser)
    {
      res.send({statusCode:400,
        message:"user already exist"})
    }
    else
    {

      let hashedPassword = await hashing(req.body.password)
      req.body.password=hashedPassword
      const attrefe= await attendnce.create({Employeeid:req.body.Employeeid}) 
      const refer= attrefe._id

    const data= await EmployeeDetails.create(
    {
      name:req.body.name,email:req.body.email,
      Employeeid:req.body.Employeeid,
      ctc:req.body.ctc,
      password:req.body.password,
      attendnce:refer
    })
     /* {
      name:req.body.name,
      email:req.body.email,
      ctc:req.body.ctc,
      mobile:req.body.mobile,
    }*/
    res.send({statusCode:200,
      message:"User Created",
      payload:data,
    
    })
  }}
   catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"internal error",
      error:error
    })
  }
  
});

/* Emply usind id */
router.post('/login',async(req,res)=>{
  try {
    const val= await EmployeeDetails.findOne({email:req.body.email})
    if(val)
    {
      const compare= await hashcompare(req.body.password,val.password) 
  
      if(compare)
      {
        const token= await createJWT({email:req.body.email})
        res.send({
          message:"Login Success",
          token:token,
          statusCode:200
        })
      }
      else
      {
        res.send({
        message:"incorrect Password",
        statusCode:400 
      })
      }
    }
  else
  {
    res.send({
      message:"user not exist",
      statusCode:400
    })
  
  }
  
  }
   catch (error) {
    res.send({
      message:"internal error"
    })
    
  }
  })

//jwt verification employee page after login
router.get('/verify-token/:token',async(req,res)=>{
    try {
      const validity= await authVerify(req.params.token) 
      console.log(validity)
      if(validity)
      {
        const data= await EmployeeDetails.findOne({email:validity.email})

        res.send({
          statusCode:400,
          message:"valid",
          payload:data
        })
      }
      else{
        res.send({
          statusCode:401,
          message:"timeout",
          pay:validity
        })
      }
    } catch (error) {
      
    }
  })

  // push login and logout time in collection

  router.get('/push',async(req,res)=>{
  try {
   
      
        const value =  await EmployeeDetails.findOne({email:req.body.email})
        const ctc= value.attendnces
        
        res.send({
            message:ctc
        })
      
  } catch (error) {
    res.send({message:"error"})
    
  }


})

// after employee Login 
router.post('/')

module.exports = router;
