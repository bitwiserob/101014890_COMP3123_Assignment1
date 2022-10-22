var express = require('express');
var router = express.Router();
const userModel = require('../model/user.js');
/* GET users listing. */
router.get('/', function(req, res){
  res.send('respond with a resource');
});


router.post('/signup', async (req, res) => {
  console.log(req.body)
  if(!req.body) {
      return res.status(400).send({
          message: "invalid user"
      });
  }
  const user = new userModel(req.body);
  try{
      await user.save();
      res.status(200).send("signed up")
  }catch (err){
      console.log("Error occured " + err)
      res.status(500).send(err);
  }
});

//login
router.post('/login',
    async (req, res) => {
        try {
            const user = await userModel.username(req.body.username);
            if (user.password === req.body.password) {
                res.status(200).send("logged in")
            } else {
                res.status(400).send("invalid login")
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });


module.exports = router;
