import React, { useContext } from "react";
import Notecontext from "../Contexts/notes/NoteContext";
const Noteitem = (props) => {
  const context = useContext(Notecontext);
  const { deletenote  } = context;
  const { note , updatenote } = props;
  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i onClick={()=>{updatenote(note)}} className="fa-regular fa-pen-to-square mx-2"></i>
            <i
              onClick={()=>{deletenote(note._id)}}
              className="fa-solid fa-trash-can mx-2"
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
