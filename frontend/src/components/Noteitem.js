import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AlertContext from "../context/alert/AlertContext";

function Noteitem(props) {
    const { note, updateNote } = props;

    const alertcontext = useContext(AlertContext);
    const {showAlert} = alertcontext;
    const context = useContext(noteContext);
    const {deleteNote} = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>

          {/* To delete a note */}
          <svg
            id="i-trash"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            onClick={() => {
              deleteNote(note._id);
              showAlert("success","Note deleted successfully");
            }}
          >
            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
          </svg>

          {/* To update a note */}
          <svg
            id="i-compose"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            onClick={() => {
                updateNote(note);
              }}
          >
            <path d="M27 15 L27 30 2 30 2 5 17 5 M30 6 L26 2 9 19 7 25 13 23 Z M22 6 L26 10 Z M9 19 L13 23 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
