var express = require('express');
const { EmployeeDetails, AdminDetails, attendnce } = require('../Schema');
const mongoose = require('mongoose');
const { dbUrl } = require('./DbConfig');
const { hashing } = require('../auth');
var router = express.Router();
mongoose.connect(dbUrl)
const toId= mongoose.Types.ObjectId
/* GET users listing. */

// POST to get input  pswd hashing 

// to get all employe details
router.get('/',async(req,res)=>{
  try {
    const details = await EmployeeDetails.find()
  
    res.send({
      users:details,
      statusCode:200
    })

  }
   catch (error) 
   {
 
    res.send({
      statusCode:500,
      user:error
    })
  }
})
// to change value

router.put('/token/:id',async(req,res)=>{
  try{
    const details = await EmployeeDetails.updateOne({id:req.params.id},req.body)
    res.send({
      statusCode:200,
      message:"Changes Saved"
    })
  }
  catch(error)
  {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Seasaarver Error",
        error:error
      })
  }
})
// Removing employee

router.delete("/delete/:_id",async(req,res)=>{
  try {
    const data1= await EmployeeDetails.findByIdAndDelete(req.params._id)
    const data2= await attendnce.findByIdAndDelete({_id:data1.attendnces})
    if(data1){

      res.send({
        data:data1,
        message:data2,
        
      })
    }
    else
    res.send({
      message:"employee not found"
    })

  } catch (error) {
    res.send({
      message:"User not found"
    })
  }
})





// attendence


/// updating attendence table


module.exports = router;
