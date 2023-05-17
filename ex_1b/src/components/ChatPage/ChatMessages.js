import './Chat.css'

const ChatMessages = ({ activeUser, currentChat }) => {
    return (
        <ol className="chat"> 
            {activeUser.chats[currentChat].messages.map((message) => (
                <ul key={message.id} className="chat-list">
                    <div className={message.sent ? "message sent" : "message received"}>
                        <p className="text">{message.content}</p>
                        <span className="message-timestamp">{message.HMTime}</span>
                    </div>
                </ul>
            ))}
        </ol >
    );
};

export default ChatMessages;