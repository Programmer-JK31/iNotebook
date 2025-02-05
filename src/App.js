import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/alert/AlertState";

function App() {
  return (
    <NoteState>
      <AlertState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path = '/' element = {<Home />} />
          <Route exact path = '/login' element = {<Login />} />
          <Route exact path = '/signup' element = {<Signup />} />
          <Route exact path = '/about' element = {<About />} />
        </Routes>
      </Router>
      </AlertState>
    </NoteState>
  );
}

export default App;
