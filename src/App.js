import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Contexts/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react";
function App() {
  const [alert , setAlert] = useState({meassage : "" , type : ""})
  const ShowAlert = (message , type) =>{
    setAlert({
      message : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar ShowAlert={ShowAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home ShowAlert={ShowAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login ShowAlert={ShowAlert} />} />
              <Route exact path="/signup" element={<Signup ShowAlert={ShowAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
