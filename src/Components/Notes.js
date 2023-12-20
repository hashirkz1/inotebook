import React, { useContext, useEffect, useRef, useState } from "react";
import Notecontext from "../Contexts/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(Notecontext);
  const { notes, fetchallnotes , editnote } = context;
  // const [note , setNote] = useState({id : "", etitle : "" , etag : "" , edescription : ""})
  const ref =  useRef(null)
  const refClose = useRef(null)
  const navigate = useNavigate()

  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({
      id:currentnote._id,
      etitle : currentnote.title,
      edescription : currentnote.description,
      etag : currentnote.tag,
    });
  };
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handleOnclick = () => {
    editnote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.ShowAlert("Note has been Updated Successfully" , "success")
  };
const handleonChange = (e) =>{
    setNote({...note , [e.target.name] : e.target.value})
}
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchallnotes();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="my-3">
      <Addnote ShowAlert={props.ShowAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="container my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value = {note.etitle}
                    onChange={handleonChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value = {note.etag}
                    onChange={handleonChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value = {note.edescription}
                    onChange={handleonChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleOnclick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {/* is syntax ko hum jb use krte hn jb hamare pas else ki koi condition na ho jese k neeche wali line m agr notes zero hn to ye print krdega warna ni krega */}
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem ShowAlert={props.ShowAlert} updatenote={updatenote} key={note._id} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
