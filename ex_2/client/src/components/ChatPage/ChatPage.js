import "./Chat.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ContactColumn from "./ContactColumn";
import MessageColumn from "./MessageColumn";
import Network from "../Network/Network";
import { socket } from "../../socket";

const ChatPage = ({ token, setToken, activeUser, setActiveUser }) => {
    const [currentChat, setCurrentChat] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        setActiveUser(null);
        setCurrentChat(null);
        navigate("/");
    };

    useEffect(()=> {
        const handleNewMessage = (message) => {
            setActiveUser(prevUser=> {
                const findChatIndex = prevUser.chats.findIndex((chat) => chat.id === message.chatId);
                const chats = [...prevUser.chats];
                const chatId = chats[findChatIndex].id;
                chats[findChatIndex].lastMessage = message;

                if (prevUser.messages && prevUser.messages[chatId]) {
                    return {
                        ...prevUser,
                        chats,
                        messages: {
                            ...prevUser.messages,
                            [chatId]: [
                                ...prevUser.messages[chatId],
                                message,
                            ],
                        }
                    }
                }
                return {
                    ...prevUser,
                    chats,
                }
        });
        };
        socket.on('chat', handleNewMessage);
        return () => {
            socket.off('chat', handleNewMessage);
        }
    }, [setActiveUser])

    useEffect(()=> {

        socket.connect();
        socket.on('connect', () => {
            console.log("connected")
        })
        return () => {
            socket.disconnect();
        }
    }, [])


    useEffect(() => {
        Network.getChats(token).then((chats) => {
            if (!chats) {
                return null;
            }
            chats.forEach((chat)=> {
                socket.emit('joinRoom', chat.id);
            })
            setActiveUser(prev=> ({
                ...prev,
                chats: chats,
            }));
        });
    }, [token, setActiveUser]);

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
