import "./Chat.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ContactColumn from "./ContactColumn";

const ChatPage = ({ acitveUser, setActiveUser }) => {
    const [currentChat, setCurrentChat] = useState(-1);
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
                { <ContactColumn acitveUser={acitveUser} currentChat={currentChat} setCurrentChat={setCurrentChat} /> }
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