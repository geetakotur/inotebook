const express=require('express');
const router=express.Router();
var fetchuser=require('../middleware/fetchuser');
const Notes = require('../models/notes');
const { body, validationResult } = require('express-validator');//for validating user

//route:1 localhost:5000/api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id}) //find if the notes belongs to specific user
        res.json(notes);  
    } catch (error) {
        console.error(error.message);
        res.status(500).json("some error occured");
    }

   
})
//route:2 localhost:5000/api/notes/addnotes
router.post('/addnotes',[
    body('title', 'enter valid name').isLength({ min: 3 }),
    body('description', 'description must contain atleast 5 characaters').isLength({ min: 5 })],
fetchuser,async(req,res)=>{
    try {
       //if there are errors ,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
}
//create notes
notes = await Notes.create({
    title: req.body.title,
    description: req.body.description,
    tag: req.body.tag,
    user:req.user.id
  })
       res.json(notes); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json("some error occured");
    }
    
    })
    //route:3 localhost:5000/api/notes/updatenotes/:id
router.put('/updatenotes/:id',
fetchuser,async(req,res)=>{
    try {
        const{title,description,tag}=req.body; //destructuring and getting info in body
        const newNote={};
            if(title){newNote.title=title};
            if(description){newNote.description=description};
            if(tag){newNote.tag=tag};
        
        let note=await Notes.findById(req.params.id); //if the specific id mathches or not
        if(!note){return res.status(401).send("not found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not found")
        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true}) //updation
        res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).json("some error occured");
    }
    
})
//route:4 localhost:5000/api/notes/deletenotes/:id
router.delete('/deletenotes/:id',
fetchuser,async(req,res)=>{
    try {
        
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(401).send("not found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not found")
        }
        note=await Notes.findByIdAndDelete(req.params.id)
        res.json("note successfully deleted")

    } catch (error) {
        console.error(error.message);
        res.status(500).json("some error occured");
    }

 })
module.exports=router;