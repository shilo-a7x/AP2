import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./components/Logister/Register/Register";
import Login from "./components/Logister/Login/Login"
import { useState } from 'react';
import ChatPage from './components/ChatPage/ChatPage';



function App() {
  const [users, setUsers] = useState({});
  const [activeUser, setActiveUser] = useState('');
  const [credentials, setCredentials] = useState({a:"1"});
  

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path='/register' element={
              // Render the Signup component.
              <>
                <Register users={users} setUsers={setUsers} credentials={credentials} setCredentials={setCredentials} />
              </>
            } />
            <Route path='/' element={
              // Render the Signin component.
              <>
                <Login activeUser={activeUser} setActiveUser={setActiveUser} credentials={credentials}/>
              </>
            } />
            <Route path='/ChatPage' element={
              // Render the Signin component.
              <>
                <ChatPage activeUser={activeUser} />
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
