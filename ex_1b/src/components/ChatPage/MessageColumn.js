import ChatMessages from "./ChatMessages";
import './Chat.css';
import { useEffect, useRef, useState } from "react";

const MessageColumn = ({ activeUser, setActiveUser, currentChat }) => {
    const messageBox = useRef(null);

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
            const time = new Date();
            const currentTime = time.toLocaleString('he-IL', { year: 'numeric', month: 'numeric', day: 'numeric',hour: '2-digit', minute: '2-digit' });
            const HMTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // Create new message object
            const newMessage = {
                id: activeUser.chats[currentChat].messages.length + 1, sent: true, content: message, time: currentTime, HMTime: HMTime
            };
            sendMessage(newMessage);
            messageBox.current.value = '';
        }
    };


    const keyPressed = (e) => {
        if (messageBox.current.value === "" && (/\s/.test(e.key) || e.key === "Enter")) {
            e.preventDefault();
        } else if (e.key === "Enter" && !e.shiftKey) {
            sendTextMessage();
            e.preventDefault();
        }
    }

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
                <span className="input-bar input-group-text">
                    <textarea ref={messageBox} id="send-message-input" placeholder="Type a message..." className="form-control"
                        onKeyDown={keyPressed} />
                        <button className="center send-button" onClick={sendTextMessage}>
                            <i className="bi bi-send"></i>
                        </button>
                </span>
        </>) || <div>
                    Select a contact to start messaging...
            </div>}
    </>);
}

export default MessageColumn;