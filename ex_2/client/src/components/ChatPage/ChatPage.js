import "./Chat.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ContactColumn from "./ContactColumn";
import MessageColumn from "./MessageColumn";

const ChatPage = ({ token, setToken, activeUser, setActiveUser }) => {
    const [currentChat, setCurrentChat] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        setActiveUser(null);
        setCurrentChat(null);
        navigate("/");
    };

    return (
        <div>
            <button type="button" className="Logout-button" onClick={logout}>
                Logout
            </button>
            <br></br>
            <div className="container">
                <div className="left-panel">
                    {
                        <ContactColumn
                            token={token}
                            setActiveUser={setActiveUser}
                            activeUser={activeUser}
                            currentChat={currentChat}
                            setCurrentChat={setCurrentChat}
                        />
                    }
                </div>
                <div className="right-panel">
                    <MessageColumn
                        token={token}
                        activeUser={activeUser}
                        setActiveUser={setActiveUser}
                        currentChat={currentChat}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
