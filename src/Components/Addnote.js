import React, { useContext , useState } from 'react'
import Notecontext from "../Contexts/notes/NoteContext";
const Addnote = (props) => {
    const context = useContext(Notecontext);
    const { addnote } = context;
    const [note , setNote] = useState({title : "",tag : "" , description : ""})
    const handleOncClick = (e) =>{
        e.preventDefault();
        addnote(note.title , note.tag , note.description)
        props.ShowAlert("Note has been added successfully" , "success")
        setNote({title : "",tag : "" , description : ""})
    }
    const handleonChange = (e) =>{
        setNote({...note , [e.target.name] : e.target.value})
    }
  return (
    <form className="container my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={handleonChange}
            value = {note.title}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleonChange}
            value={note.tag}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleonChange}
            value = {note.description}
            minLength={5}
            required
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} onClick={handleOncClick} type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
  )
}

export default Addnote
