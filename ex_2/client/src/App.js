import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Register from "./components/Logister/Register/Register";
import Login from "./components/Logister/Login/Login";
import { useState } from "react";
import ChatPage from "./components/ChatPage/ChatPage";

function App() {
    const [token, setToken] = useState(null);
    const [activeUser, setActiveUser] = useState("");

    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                        <Route
                            path="/register"
                            element={
                                // Render the Signup component.
                                <>
                                    <Register />
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                // Render the Signin component.
                                <>
                                    <Login
                                        setActiveUser={setActiveUser}
                                        setToken={setToken}
                                    />
                                </>
                            }
                        />
                        <Route
                            path="/ChatPage"
                            element={
                                // Render the Signin component.
                                activeUser && token ? (
                                    <>
                                        <ChatPage
                                            token={token}
                                            setToken={setToken}
                                            activeUser={activeUser}
                                            setActiveUser={setActiveUser}
                                        />
                                    </>
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
