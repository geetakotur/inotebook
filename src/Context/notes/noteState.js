// noteState.js
import React from "react";
import NoteContext from "./contextNote";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialnotes = [ ]
  const [notes, setnotes] = useState(initialnotes)

  //get a note
  const getnote = async () => {
    //api call
       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           "auth-token": localStorage.getItem('token')
         },
       });
       const json=await response.json();
      console.log(json)
      setnotes(json)
     }

  //Add a note
  const addnote = async (title, description, tag) => {
 //api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note =await response.json();
    setnotes(notes.concat(note));
    
   
    
  }

  //delete a note
  const deletenote = async (id) => {
   //api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      
    });
   const json = response.json();
   console.log(json)
    console.log("deleting note with id" + id);
    const newnote = notes.filter((notes) => { return notes._id !== id })
    setnotes(newnote);
  }

  //update a note
  const editnote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json =await response.json();
    console.log(json)
     
    let newnotes=JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }  
    }
    setnotes(newnotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote,getnote }}>
      {props.children}
    </NoteContext.Provider>
  );

}
export default NoteState;
