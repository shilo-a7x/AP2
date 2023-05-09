import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Logister.css";



const Register = () => {

    const usernameContainer = useRef(null);
    const passwordContainer = useRef(null);
    const confirmPasswordContainer = useRef(null);
    const displayNameContainer = useRef(null);

    const navigate = useNavigate();

    const [usernameFieldValid, setUsernameFieldValid] = useState(false);
    const [passwordFieldValid, setPasswordFieldValid] = useState(false);
    const [passwordConfirmationFieldValid, setPasswordConfirmationFieldValid] = useState(false);
    const [displayNameValid, setDisplayNameFieldValid] = useState(false);
    const [typeInConfirmation, setTypeInConfirmation] = useState(false);

    const validateUsername = () => {
        let invalid = false;
        const username = usernameContainer.current.value;

        // Clear error message
        document.getElementById("username").classList.remove("is-invalid");
        document.getElementById("username-label").classList.remove("text-danger");

        // // Check if username length is less than 3
        if (username.length < 3) {
            document.getElementById("username-error").innerHTML = "Username must be at least 3 characters long";
            document.getElementById("username").classList.add("is-invalid");
            document.getElementById("username-label").classList.add("text-danger");
            invalid = true;
        }
        setUsernameFieldValid(!invalid);
    }



    return (<div>
        <form className="register-form" >
            <div>
                <label htmlFor="username" id="username-label">Username:</label>
                <input ref={usernameContainer} type="text" id="username" className="form-control" name="name" onChange={validateUsername}
                    maxLength="15" required />
                <label className="invalid-feedback" id="username-error">Invalid</label>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input ref={passwordContainer} type="password" id="password" className="form-control" name="password" required></input>
            </div>
            <div>
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input ref={confirmPasswordContainer} type="password" className="form-control" id="confirm-password" name="confirm-password" required></input>
            </div>
            <div>
                <label htmlFor="display-name">Display name:</label>
                <input ref={displayNameContainer} type="text" id="display-name" className="form-control" name="display-name" required></input>
            </div>
            <div>
                <label htmlFor="profile-pic">Upload Picture:</label>
            </div>
            <div className="input-group">
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="formFile" name="profile-pic"></input>
                    <label className="custom-file-label" htmlFor="profile-pic">Choose file</label>
                </div>
            </div>
            <br></br>
            <p>Already registered? Click here to login.</p>
            <button className="login-btn">Register</button>
            <br></br><br></br>
        </form>
    </div>);
}

export default Register;