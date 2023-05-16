import "./Chat.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ContactColumn from "./ContactColumn";
import MessageColumn from "./MessageColumn";

const ChatPage = ({ activeUser, setActiveUser }) => {
    const [currentChat, setCurrentChat] = useState(-1);
    const navigate = useNavigate();
    console.log(activeUser)

    const logout = () => {
        setActiveUser(null);
        //setCurrentChat(-1);
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
                <MessageColumn activeUser={activeUser}
                    setActiveUser={setActiveUser}
                    currentChat={currentChat}
                    // messagesCache={messagesCache}
                    // setMessagesCache={setMessagesCache}
                 />
            </div>
        </div>
    </div>
    );
};

export default ChatPage;