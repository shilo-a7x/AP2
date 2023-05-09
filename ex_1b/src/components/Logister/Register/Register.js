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

    const deleteUsernameError = () => {
        document.getElementById("usernameError").innerHTML = "";
    }

    const deletePasswordError = () => {
        document.getElementById("passwordError").innerHTML = "";
    }

    const deleteConfirmPasswordError = () => {
        document.getElementById("confirmPasswordError").innerHTML = "";
    }

    const deleteDisplayNameError = () => {
        document.getElementById("displayNameError").innerHTML = "";
    }

    const validateUsername = () => {
        let invalid = false;
        const username = usernameContainer.current.value;

        // // Check if username length is less than 3
        if (username.length < 3) {
            document.getElementById("usernameError").innerHTML = "Username must be at least 3 characters long";
            invalid = true;
        }
        else {
            document.getElementById("usernameError").innerHTML = "";
        }
        setUsernameFieldValid(!invalid);
    }

    // Prevent user from entering invalid characters
    const enforceUsernameRegEx = (e) => {
        document.getElementById("username").classList.remove("is-invalid");
        document.getElementById("username").classList.remove("text-danger");
        document.getElementById("usernameError").innerHTML = "";

        if (!/[a-zA-Z0-9-]$/.test(e.key)) {
            document.getElementById("usernameError").innerHTML = "Username must contain only letters and numbers";
            document.getElementById("username").classList.add("is-invalid");
            document.getElementById("usernameLabel").classList.add("text-danger");
            e.preventDefault();
        }
    }

    // Validate password fields and show appropriate error messages
    const validatePasswordField = () => {
        let invalid = false;
        const password = passwordContainer.current.value;

        // Check if password is at least 6 characters long
        if (password.length < 6) {
            document.getElementById("passwordError").innerHTML = "Password must be at least 6 characters long";
            invalid = true;
        }
        // Check if password contains at least one number, one lowercase and one uppercase character
        else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            document.getElementById("passwordError").innerHTML = "Password must contain at least one number, one lowercase and one uppercase character";
            invalid = true;
        }
        else {
            document.getElementById("passwordError").innerHTML = "";
        }

        setPasswordFieldValid(!invalid);
    }

    const validatePasswordConfirmation = () => {
        // If didn't type in confirmation field, don't validate
        if (!typeInConfirmation) {
            return;
        }

        let invalid = false;
        const password = passwordContainer.current.value;
        const passwordConfirmation = confirmPasswordContainer.current.value;

        // Check if password and password confirmation match
        if (password !== passwordConfirmation) {
            document.getElementById("confirmPasswordError").innerHTML = "Password confirmation doesn't match";
            invalid = true;
        }
        else {
            document.getElementById("confirmPasswordError").innerHTML = "";
        }

        setPasswordConfirmationFieldValid(!invalid);
    }

    // Prevent user from entering invalid characters
    const enforceDisplayNameRegEx = (e) => {
        document.getElementById("displayName").classList.remove("is-invalid");
        document.getElementById("displayName").classList.remove("text-danger");
        document.getElementById("displayNameError").innerHTML = "";

        if (!/[a-zA-Z0-9-]$/.test(e.key)) {
            document.getElementById("displayName").classList.add("is-invalid");
            document.getElementById("displayNameLabel").classList.add("text-danger");
            document.getElementById("displayNameError").innerHTML = "Display name can only contain letters, spaces, hyphens, periods, dots, and commas";
            e.preventDefault();
        }
    }

    const validateDisplayName = () => {
        let invalid = false;
        const displayName = displayNameContainer.current.value;

        // Check if display length is less than 3
        if (displayName.length < 3) {
            document.getElementById("displayNameError").innerHTML = "Display name must be at least 3 characters long";
            invalid = true;
        }
        else {
            document.getElementById("displayNameError").innerHTML = "";
        }
        setDisplayNameFieldValid(!invalid);
    }

    return (<div>
        <form className="register-form" >
            <div className="formField">
                <label htmlFor="username" id="usernameLabel">Username:</label>
                <input ref={usernameContainer} type="text" id="username" className="form-control" name="username"
                    onKeyDown={enforceUsernameRegEx} onBlur={validateUsername} onFocusCapture={deleteUsernameError}
                    maxLength="15" required />
                <span className="errorMessage" id="usernameError"></span>
            </div>
            <div className="formField">
                <label htmlFor="password" id="passwordLabel">Password:</label>
                <input ref={passwordContainer} type="password" id="password" className="form-control" name="password"
                    onBlur={() => {
                        validatePasswordField();
                        validatePasswordConfirmation();
                    }}
                    onFocusCapture={deletePasswordError}
                    maxLength="25" required></input>
                <span className="errorMessage" id="passwordError"></span>
            </div>
            <div className="formField">
                <label htmlFor="confirmPassword" id="confirmPasswordLabel">Confirm Password:</label>
                <input ref={confirmPasswordContainer} type="password" className="form-control" id="confirmPassword" name="confirmPassword"
                    onBlur={() => {
                        setTypeInConfirmation(true);
                        validatePasswordConfirmation();
                    }}
                    onFocusCapture={deleteConfirmPasswordError}
                    maxLength="25" required></input>
                <span className="errorMessage" id="confirmPasswordError"></span>
            </div>
            <div className="formField">
                <label htmlFor="displayName" id="displayNameLabel">Display name:</label>
                <input ref={displayNameContainer} type="text" id="displayName" className="form-control" name="displayName" 
                onKeyDown={enforceDisplayNameRegEx} onBlur={validateDisplayName} onFocusCapture={deleteDisplayNameError}
                maxLength="15" required />
                <span className="errorMessage" id="displayNameError"></span>
            </div>
            <div className="formField">
                <label htmlFor="profile-pic">Upload Picture:</label>
                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="formFile" name="profile-pic"></input>
                        <label className="custom-file-label" htmlFor="profile-pic">Choose file</label>
                    </div>
                </div>
            </div>
            <br></br>
            <p>Already registered? <a href="login.html">Click here</a> to login.</p>
            <button className="login-btn">Register</button>
            <br></br><br></br>
        </form>
    </div>);
}

export default Register;