import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AlertContext from "../context/alert/AlertContext";

export default function Addnote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const alertcontext = useContext(AlertContext);
  const {showAlert} = alertcontext;
  const [note, setNote] = useState({title: "", description: "", tag : ""});

  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    showAlert("success", "Wonderful!! Your note has been added successfully");
    setNote({title: "", description: "", tag : ""});
  }
  const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value});
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={note.title}
            placeholder="Your note title here"
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
            value={note.tag}
            onChange={onChange}
            placeholder="Your note title here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Note Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={note.description}
            onChange={onChange}
          ></textarea>
        </div>
          <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>
            Add note
          </button>
      </div>
    </div>
  );
}
