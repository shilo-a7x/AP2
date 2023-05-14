import "./Chat.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ContactColumn from "./ContactColumn";
import Apps from "./test";

const ChatPage = ({ acitveUser, setActiveUser }) => {

    const navigate = useNavigate();

    const logout = () => {
        setActiveUser(null);
        navigate("/");
    }

    return (<div>
        <button type="button" className="Logout-button" onClick={logout}>Logout</button>
        <br></br>
        <div className="container">
            <div className="left-panel">
                { <ContactColumn acitveUser={acitveUser} /> }
            </div>
            <div className="right-panel">
                <span>{acitveUser}hello</span>
                {/* <MessageColumn user={user}
                    setUser={setUser}
                    token={token}
                    currentChatID={currentChatID}
                    setCurrentChatID={setCurrentChatID}
                    messagesCache={messagesCache}
                    setMessagesCache={setMessagesCache}
                    connection={connection} /> */}
            </div>
        </div>
    </div>
    );
};

export default ChatPage;