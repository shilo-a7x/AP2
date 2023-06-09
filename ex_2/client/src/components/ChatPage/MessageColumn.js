import ChatMessages from "./ChatMessages";
import "./Chat.css";
import Network from "../Network/Network";
import { useEffect, useRef } from "react";
import { socket } from "../../socket";

const MessageColumn = ({ token, activeUser, setActiveUser, currentChat }) => {
    const messageBox = useRef(null);

    const messagesLength = currentChat
        ? activeUser.messages[currentChat.id].length
        : 0;

    const sendTextMessage = async () => {
        const message = messageBox.current.value.trim();
        if (message.length === 0 || !currentChat) {
            return;
        }
        const newMessage = await Network.sendMessage(
            message,
            currentChat.id,
            token
        );
        if (!newMessage) {
            alert("Could not send message");
            return;
        }
        socket.emit('chat', {
            roomId: currentChat.id,
            message: {
                chatId: currentChat.id, content: message, sender: { username: activeUser.username }, created: new Date()
            }
        })
        messageBox.current.scrollTop = 0;
        messageBox.current.value = "";
    };

    const keyPressed = (e) => {
        if (
            messageBox.current.value === "" &&
            (/\s/.test(e.key) || e.key === "Enter")
        ) {
            e.preventDefault();
        } else if (e.key === "Enter" && !e.shiftKey) {
            sendTextMessage();
            e.preventDefault();
        }
    };

    const scrollToBottom = () => {
        const messageBubbles = document.getElementsByClassName("message");
        // If there are messages
        if (messageBubbles.length > 0) {
            messageBubbles[messageBubbles.length - 1].scrollIntoView();
        }
    };

    // Scroll to the bottom when the number of messages changes
    useEffect(scrollToBottom, [messagesLength]);

    return (
        <>
            {(currentChat && (
                <>
                    <div className="contact-info">
                        <img
                            src={currentChat?.user?.profilePic}
                            alt="profile pic"
                        />
                        <p className="name">{currentChat.user.displayName}</p>
                    </div>
                    <ChatMessages
                        activeUser={activeUser}
                        currentChat={currentChat}
                    />
                    <span className="input-bar input-group-text">
                        <textarea
                            ref={messageBox}
                            id="send-message-input"
                            placeholder="Type a message..."
                            className="form-control"
                            aria-label="With textarea"
                            onKeyDown={keyPressed}
                        />
                        <button
                            className="center btn btn-primary send-button"
                            onClick={sendTextMessage}>
                            <i className="bi bi-send"></i>
                        </button>
                    </span>
                </>
            )) || <div>Select a contact to start messaging...</div>}
        </>
    );
};

export default MessageColumn;
