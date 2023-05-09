import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Logister.css";



Register = () => {

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

    return (<div>
        <form className="register-form" onSubmit={signedUp}>
            <label htmlFor="name">Username:</label>
            <input ref={usernameContainer} type="text" id="name" className="form-control" name="name" onChange={validateUsername} onKeyUp={checkRegex} onFocus={deleteUsernameError}
                maxLength="15" required></input>
            <label htmlFor="password">Password:</label>
            <input ref={passwordContainer} type="password" id="password" className="form-control" name="password" required></input>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input ref={confirmPasswordContainer} type="password" className="form-control" id="confirm-password" name="confirm-password" required></input>
            <label htmlFor="display-name">Display name:</label>
            <input ref={displayNameContainer} type="text" id="display-name" className="form-control" name="display-name" required></input>
            <label htmlFor="profile-pic">Upload Picture:</label>
            <div className="input-group">
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="formFile" name="profile-pic"></input>
                    <label className="custom-file-label" htmlFor="profile-pic">Choose file</label>
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