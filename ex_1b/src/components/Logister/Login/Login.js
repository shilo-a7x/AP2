import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Logister.css";

const Login = ({ users, setActiveUser, credentials}) => {
    const usernameContainer = useRef(null);
    const passwordContainer = useRef(null);
    const navigate = useNavigate();


    const handleLogin = (e) => {
        // Validate username and password
        // If valid, sign in user and redirect to main page

        const username = usernameContainer.current.value;
        const password = passwordContainer.current.value;

        if (credentials[username] === password) {
            setActiveUser(users[username]);
            navigate("/ChatPage");
        } else {
            document.getElementById("errorMessage").innerHTML = "username or password incorrect";
        }
        
        // Check if username and password are valid
        e.preventDefault();
    }

    // Prevent user from entering invalid characters
    const checkRegex = (e) => {
        if (!/[a-zA-Z0-9-]$/.test(e.key)) {
            e.preventDefault();
        }
    }

    const handleChange = (e) => {
        // Check if username and password are empty
        document.getElementById("errorMessage").innerHTML = "";
        document.getElementById("login-btn").disabled = usernameContainer.current.value === "" || passwordContainer.current.value === "";
    };

    const [isVisible, setVisible] = useState(0)

    const makeVisible = () => {
        setVisible(1 - isVisible)
    }

    return (<div id="form-frame">
        <form onSubmit={handleLogin} method="post">
            <div className="form-group">
                <label htmlFor="username" className="formContainerTitle" id="usernameLabel">Username:</label>
                <input type="text" className="form-control" id="username" name="username" ref={usernameContainer}
                    onChange={handleChange} onKeyDown={checkRegex} maxLength="15" required/>
            </div>
            <div className="form-group">
                <label htmlFor="password" className="formContainerTitle" id="passwordLabel">Password:</label>
                <input type={isVisible ? "text" : "password"} ref={passwordContainer} className="form-control"
                    maxLength="25" name="password" onChange={handleChange} />
                <button className="show-password-button" type="button" onClick={makeVisible}>
                    <span className={isVisible ? "bi bi-eye-slash" : "bi bi-eye"}></span>
                </button>
            </div>
            <div id="errorMessage" className="errorMessage"></div>
            <p>Not registered? <Link to="/register">Click here</Link> to register.</p>
            <button type="submit" className="logister-btn" id="login-btn" disabled>Login</button>
            <br></br><br></br>
        </form>
    </div>)
}

export default Login;

