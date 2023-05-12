import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./components/Logister/Register/Register";
import Login from "./components/Logister/Login/Login"
import { useState } from 'react';
import ChatPage from './components/chatPage/ChatPage';



function App() {
  const [users, setUsers] = useState({});
  const [acitveUser, setActiveUser] = useState(null);
  const [credentials, setCredentials] = useState({});

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path='/register' element={
              // Render the Signup component.
              <>
                <Register users={users} setUsers={setUsers} credentials={credentials} setCredentials={setCredentials}/>
              </>
            } />
            <Route path='/' element={
              // Render the Signin component.
              <>
                <Login credentials={credentials} setActiveUser={setActiveUser}/>
              </>
            } />
            <Route path='/chatPage' element={
              // Render the Signin component.
              <>
                <ChatPage activeUser={acitveUser}/>
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
