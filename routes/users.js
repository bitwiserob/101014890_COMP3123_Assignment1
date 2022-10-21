var express = require('express');
var router = express.Router();
const userModel = require('../models/user.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
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

router.get('/notes', async (req, res) => {
  const notes = await noteModel.find({});    
  try{
      res.send(notes);
  }catch(err){
      res.status(500).send(err);
  }

});

router.get('/notes/:noteId', async (req, res) => {
  // Validate request
  if(!req.params.noteId) {
      return res.status(400).send({
          message: "Note content can not be empty"
      });
  }

  const note = await noteModel.findById(req.params.noteId); 
  try{
      res.send(note);
  }catch(err){
      res.status(500).send(err);
  }

});

//TODO - Update a Note with noteId
router.put('/notes/:noteId', async(req, res) => {
  console.log(req.params.noteId)
  console.log(req.body)
  try{
      const updatedNote = await noteModel.findByIdAndUpdate(req.params.noteId, req.body)
      const note = await updatedNote.save()
      res.send(note)
  }catch (err){
      console.log(err)
      res.status(500).send(err);
  }

});

router.delete('/notes/:noteId', async (req, res) => {
  // Validate request
  try {
      const note = await noteModel.findByIdAndDelete(req.params.noteId)
  
      if (!note) { 
          res.status(404).send("No item found")
      }
      res.status(200).send(note)
    } catch (err) {
      res.status(500).send(err)
    }
});


module.exports = router;
