var express = require('express');
var router = express.Router();
const userModel = require('../model/user.js');
/* GET users listing. */
router.get('/user', function(req, res){
  res.send('respond with a resource');
});


router.post('/user/signup', async (req, res) => {
  console.log(req.body)
  if(!req.body) {
      return res.status(400).send(JSON.stringify({
          message: "invalid user"
      }));
  }
  const user = new userModel(req.body);
  try{
      await user.save();
      res.status(200).json(({
          message: `user ${user.username} added`
      }))
  }catch (err){
      console.log("Error occured " + err)
      res.status(500).send(err);
  }
});

//login
router.post('/user/login', async (req,res) => {
    try{
        const user_account= await userModel.findOne({"email" : req.body.email})

        if (user_account) {
            return res.json({
                status: 200,
                username: user_account.username,
                message: "User signed in"
            })
        }

        else {
            return res.send({
                status: 400,
                message: "User not found"
            })
        }





    }

    catch (error) {
        res.status(400).send(error)
    }

});


module.exports = router;
