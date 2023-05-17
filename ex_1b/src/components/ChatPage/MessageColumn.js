import ChatMessages from "./ChatMessages";
import './Chat.css';
import { useEffect, useRef, useState } from "react";

const MessageColumn = ({ activeUser, setActiveUser, currentChat }) => {
    const messageBox = useRef(null);
    // Set state for send button disabled state
    const [messageEmpty, setMessageEmpty] = useState(true);

    const messagesLength = currentChat !== -1 ? activeUser.chats[currentChat].messages.length : 0;
    const sendMessage = (message) => {
        // Add new message to current chat's messages
        if (currentChat !== -1) {
            setActiveUser({
                ...activeUser, chats: {
                    ...activeUser.chats, [currentChat]: {
                        ...activeUser.chats[currentChat], messages: [...activeUser.chats[currentChat].messages, message]
                    }
                }
            });
        }
    };

    const sendTextMessage = () => {
        const message = messageBox.current.value.trim();
        if (message.length > 0) {
            // Get current time in hh:mm format
            const time = new Date();
            const currentTime = time.toLocaleString('he-IL', { year: 'numeric', month: 'numeric', day: 'numeric',hour: '2-digit', minute: '2-digit' });
            const HMTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // Create new message object
            const newMessage = {
                id: activeUser.chats[currentChat].messages.length + 1, sent: true, content: message, time: currentTime, HMTime: HMTime
            };
            sendMessage(newMessage);

            // Disable send button
            setMessageEmpty(true);
            messageBox.current.value = '';
            setInputHeight();
        }
    };

    const typing = () => {
        setMessageEmpty(messageBox.current.value.length === 0);
        setInputHeight();
    };

    const setInputHeight = () => {
        let messageInput = document.getElementById("send-message-input");
        let inputBar = document.getElementById("input-bar");
        if (!messageInput || !inputBar) {
            return;
        }
        // This might seem bizarre, but it's necessary to set the height of the input section
        let optimalHeight;
        do {
            optimalHeight = messageInput.scrollHeight;
            inputBar.style.height = Math.max(messageInput.scrollHeight + 10, 50) + "px";
        } while (messageInput.scrollHeight !== optimalHeight);
    };

    const keyPressed = (e) => {
        setInputHeight();
        if (messageBox.current.value === "" && (/\s/.test(e.key) || e.key === "Enter")) {
            e.preventDefault();
        } else if (e.key === "Enter" && !e.shiftKey) {
            sendTextMessage();
            e.preventDefault();
        }
    }

    const updateMessageBox = () => {
        if (messageBox.current) {
            // Set message box value to the message from cache;
            setMessageEmpty(messageBox.current.value.length === 0);
        }
        setInputHeight();
    }

    // add messagesCache
    useEffect(updateMessageBox, [activeUser, currentChat]);

    const scrollToBottom = () => {
        const messageBubbles = document.getElementsByClassName('message');
        // If there are messages
        if (messageBubbles.length > 0) {
            messageBubbles[messageBubbles.length - 1].scrollIntoView();
        }
    };

    // Scroll to the bottom when the number of messages changes
    useEffect(scrollToBottom, [messagesLength]);

    return (<>
        {(currentChat !== -1 && <>
                <div className="contact-info">
                        <img
                            src={process.env.PUBLIC_URL + '/profilePic/noFace.png'}
                             alt="profile pic" />
                        <p className="name">
                            {activeUser.chats[currentChat].name}
                        </p>
                </div>
            <ChatMessages activeUser={activeUser}
                currentChat={currentChat} />
                <span className="input-bar">
                    <input ref={messageBox} id="send-message-input" placeholder="Type a message..." className="form-control"
                        onChange={typing}
                        onKeyDown={keyPressed} />
                        <button className="center send-button" onClick={sendTextMessage}>
                            {/* <i className="bi bi-send" /> */}Send
                        </button>
                </span>
        </>) || <div className="max">
                <div className="welcome center">
                    Select a contact to start messaging...
                </div>
            </div>}
    </>);
}

export default MessageColumn;