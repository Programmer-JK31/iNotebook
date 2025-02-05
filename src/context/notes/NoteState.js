import React, {useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://192.168.0.168:8000/"
    const [notes,setNotes] = useState([]);
      
    const fetchNotes = async () => {
        try {
            const url = `${host}api/notes/fetchallnotes`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    // Add a note
    const addNote = async(title, description, tag) => {
        try {
            const url = `${host}api/notes/addnote`;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({title, description, tag})
            });
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
      }
      
    // Delete a note
      const deleteNote = async (id)=> {
        try {
            const url = `${host}api/notes/deletenote/${id}`;
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            });
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
      }
      
    // Edit a note
      const editNote = async(note) => {
        try {
            const url = `${host}api/notes/updatenote/${note._id}`;
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(note)
            });
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
      } 

    return (
        <noteContext.Provider value = {{notes, addNote, deleteNote, editNote, fetchNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;