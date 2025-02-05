const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

/* 
ROUTE 1 : GET "/api/notes/fetchallnotes"
    Get all the notes of particular user, login required
*/
router.get('/fetchallnotes' , fetchuser, async (req,res) => {
    try{
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

/* 
ROUTE 2 : POST "/api/notes/addnote"
    Add a new note using post, login required
*/
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({min : 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min : 5}),
], async (req,res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors : errors.array()});
        }
        const note = new Notes({
            title,description, tag, user : req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

/* 
ROUTE 3 : PUT "/api/notes/updatenote"
    Add a new note using post, login required
*/
router.put('/updatenote/:id', fetchuser, async (req,res) => {
    try{
        const { title, description, tag } = req.body;

        const newNote = {};
        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;

        //Find the note by Id to be updated
        let note = await Notes.findById(req.params.id);
        if(!note) return res.status(404).send("Not found")

        //Allow updation only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Unauthorized");
        }

        //Update Note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
        res.json({note});
    
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some Internal Error")
    }
})

/* 
ROUTE 4 : DELETE "/api/notes/deletenote/id"
    delete a note using delete, login required
*/
router.delete('/deletenote/:id', fetchuser, async (req,res) => {
    try{
        //Find the note by Id to be deleted
        let note = await Notes.findById(req.params.id);
        if(!note) return res.status(404).send("Not found")

        //Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Unauthorized");
        }

        //Update Note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note deleted successfully"});
    
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some Internal Error")
    }
})

module.exports = router;