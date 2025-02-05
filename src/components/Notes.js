import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import AlertContext from "../context/alert/AlertContext";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const alertcontext = useContext(AlertContext);
  const {showAlert} = alertcontext;
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;
  const [note, setNote] = useState({title: "", description: "", tag : ""});
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes();
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const updateNote = (Note) => {
    setNote(Note);
    ref.current.click();
  };

  const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value});
  }

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note);
    showAlert("success","Your note has been updated successfully. Have a nice day :)");
    ref.current.click();
  }
  

  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.length === 0 && <center><h5>No Notes to display</h5></center>}
      {notes.map((note) => {
        return (
          <Noteitem
            key={note._id}
            updateNote={updateNote}
            note={note}
          ></Noteitem>
        );
      })}
      <Addnote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
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
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={note.title}
                  onChange={onChange}
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
