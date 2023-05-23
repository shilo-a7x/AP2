import "./Chat.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ContactColumn from "./ContactColumn";
import MessageColumn from "./MessageColumn";

const ChatPage = ({ activeUser, setActiveUser }) => {
    const [currentChat, setCurrentChat] = useState(-1);
    const navigate = useNavigate();

    const logout = () => {
        setActiveUser(null);
        setCurrentChat(-1);
        navigate("/");
    }

    return (<div>
        <button type="button" className="Logout-button" onClick={logout}>Logout</button>
        <br></br>
        <div className="container">
            <div className="left-panel">
                {<ContactColumn setActiveUser={setActiveUser} activeUser={activeUser} currentChat={currentChat} setCurrentChat={setCurrentChat} />}
            </div>
            <div className="right-panel">
                <MessageColumn activeUser={activeUser}
                    setActiveUser={setActiveUser}
                    currentChat={currentChat}
                />
            </div>
        </div>
    </div>
    );
};

export default ChatPage;