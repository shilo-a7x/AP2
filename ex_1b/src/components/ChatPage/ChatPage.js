import "./Chat.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ContactColumn from "./ContactColumn";

const ChatPage = ({ activeUser, setActiveUser }) => {
    const [currentChat, setCurrentChat] = useState(-1);
    const navigate = useNavigate();

    const logout = () => {
        setActiveUser(null);
        setCurrentChat(-1);
        navigate("/");
    }

    useEffect (() => {
        console.log(activeUser);
    })

    return (<div>
        <button type="button" className="Logout-button" onClick={logout}>Logout</button>
        <br></br>
        <div className="container">
            <div className="left-panel">
                {<ContactColumn setActiveUser={setActiveUser} activeUser={activeUser} currentChat={currentChat} setCurrentChat={setCurrentChat} />}
            </div>
            <div className="right-panel">
                <span>hello</span>
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