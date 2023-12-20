import { useState } from "react";
import Notecontext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // Get all notes from database
  const fetchallnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const data = await response.json();
    setNotes(data);
  };
  // Add a note function
  const addnote = async (title, description, tag) => {
    // Server Side code to add note in database as well
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    //   Client Side logic
    setNotes(notes.concat(note));
  };

  // Edit a note
      // Server side logic
      const editnote = async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json = await response.json(); 
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Client side logic
        for(let index=0 ; index <=notes.length ; index++){
          const element = newNotes[index]
          if (element._id===id){
            newNotes[index].title = title
            newNotes[index].description = description
            newNotes[index].tag = tag
            break
          }
        }
        setNotes(newNotes)
      }
  // Delete a Note
  const deletenote = async (id) => {
    // Server Side Logic to delete note from database as well
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    // Client Side code.
    const newnotes = notes.filter((element) => {
      return element._id !== id;
    });
    setNotes(newnotes);
    return response.json();
  };
  return (
    <Notecontext.Provider
      value={{ notes, addnote, deletenote, editnote, fetchallnotes }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default NoteState;
