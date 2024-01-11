import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/noteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <div>
      <NoteState>
      <Router>
      <NavBar/>
      <Alert alert={alert}/>
        <div className="container">  
        <Routes>
          <Route path="/Home" element={<Home showAlert={showAlert} />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login showAlert={showAlert} />} />
          <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
