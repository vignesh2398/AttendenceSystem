
var express = require('express');
const { hashing, hashcompare, createJWT } = require('../auth');
const { AdminDetails, attendnce, attendnce2, EmployeeDetails } = require('../Schema');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// admin register
router.post('/register',async(req,res)=>{
  try {
    const val= await AdminDetails.findOne({Email:req.body.Email})
    let aa= await(req.body)
    if(!val)
    {
      const hashs=await hashing(req.body.Password)
      req.body.Password=hashs
      const data= await AdminDetails.create(req.body)
        res.send({
        message:data,
        statusCode:200
      })
    }
    else{
      res.send({
        message:aa
      })
    }
  } 
  catch (error) {
    res.send({
      message:"error"
    })
  }
})


// admin login  
router.post('/login',async(req,res)=>{
try {
  const val= await AdminDetails.findOne({Email:req.body.Email})
  if(val)
  {
    const compare= await hashcompare(req.body.Password,val.Password) 

    if(compare)
    {
      const token= await createJWT({email:req.body.email})
      res.send({
        message:"usertrue",
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

router.post('/updateattendence',async(req,res)=>{
  try {
    const data= await attendnce.findByIdAndUpdate({_id:req.body._id},{$push:{"atte":{Login:req.body.Login,Logout:req.body.Logout}}})
    const data2=await attendnce.findById({_id:req.body._id})
    res.send({
      message:data,
      statusCode:200
    })
  } catch (error) {
    res.send({
      message:error,
      statusCode:400
    })
    
  }


})

router.get('/viewattence',async(req,res)=>{
  try {
    const data2=await EmployeeDetails.find().populate("attendnce","atte")
    
    res.send({
      users:data2,
      statusCode:200
    })
  } catch (error) {
    res.send({
      message:error,
      statusCode:400
    })
    
  }


})


module.exports = router;
