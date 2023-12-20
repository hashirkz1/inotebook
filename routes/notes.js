const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const router = express.Router();
// Route 1 : Fetch all notes of user using : GET "/api/notes/fetchallnotes".Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user : req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route 2 : Add a note of user using : POST "/api/notes/addnote".Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      // check that the data satisfies all the checks
      if (!errors.isEmpty()) {
        // if there are errors return bad request with errors
        res.status(400).json({ error: "Please fill all fields properly" });
      } else {
        // const user_id = req.user.id;
        const note = new Notes({
          title,
          description,
          tag,
          user : req.user.id,
        });
        const saved_note = await note.save();
        res.json(note);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route 3 : Update an existing note using : PUT "/api/notes/updatenote".Login Required
router.put("/updatenote/:id" , fetchuser , async(req, res)=>{
        const {title , description ,tag} = req.body;
        try {
        const  new_note = {}
        if(title){new_note.title = title}
        if(description){new_note.description = description}
        if(tag){new_note.tag = tag}
        // find note 
        let note = await Notes.findById(req.params.id)
        // console.log(note.user.toString())
        // console.log(req.user.id)
        // if note not found then return bad request 
        if(!note){return res.status(404).send("Not Found")}
        // if user id != user id of note to be updated give bad reguest
        // note.user.toString() note kis user ne store kiya wo id deta h 
        // aur req.user.id se hum user ki id nikal lete hn middleware ko use krke 
        else if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
        else{
            note = await Notes.findByIdAndUpdate(req.params.id , {$set : new_note } , {new : true})
            res.json(note)
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
}) 

// Route 4 : Delete an existing note using : DELETE "/api/notes/deletenote".Login Required
router.delete("/deletenote/:id" , fetchuser , async(req , res)=>{
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        else if (note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
        else{
            note = await Notes.findByIdAndDelete(req.params.id)
            res.send("Note Deleted Successfully")
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;
