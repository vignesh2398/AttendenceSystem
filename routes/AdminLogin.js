var express = require('express');
var router = express.Router();
const { dbUrl } = require('./DbConfig');
const mongoose = require('mongoose');
const { EmployeeDetails, AdminDetails, attendnce } = require('../Schema');
const { hashcompare, createJWT, authVerify, hashing } = require('../auth');


mongoose.connect(dbUrl)
const toId= mongoose.Types.ObjectId

// adding admin register  users/admin
router.post('/',async(req,res)=>{
  try {
    const val= await AdminDetails.findOne({Email:req.body.Email})
    if(val)
    {
      const data= await AdminDetails.create(req.body)

      res.send({
        message:data,
        statusCode:200
      })
    }
  } catch (error) {
    res.send({
      message:error
    })
  }
})


module.exports = router;
