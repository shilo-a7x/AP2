import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./components/Logister/Register/Register.js";
import { useState } from 'react';



function App() {
  const [users, setUsers] = useState([]);
  const [acitveUser, setActiveUser] = useState(null);
  const [credentials, setCredentials] = useState({});

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path='/' element={
              // Render the Signup component.
              <>
                <Register users={users} setUsers={setUsers} credentials={credentials} setCredentials={setCredentials}/>
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
