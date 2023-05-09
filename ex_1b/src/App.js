import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from "./components/Logister/Register/Register.js";


function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path='/register' element={
              // Render the Signup component.
              <>
                <Register />
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
