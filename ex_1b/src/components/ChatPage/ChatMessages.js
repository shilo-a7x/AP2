import './Chat.css'

const ChatMessages = ({ activeUser, currentChat }) => {
    return (
        <ol className="contacts-list">
            {activeUser.chats[currentChat].messages.map((message) => (
                <ul key={message.id}>
                    <div className={message.sent ? "message sent" : "message received"}>
                        <p className="message-text">{message.content}</p>
                        <span className="message-timestamp">{message.time}</span>
                    </div>
                </ul>
            ))}
        </ol >
    );
};

export default ChatMessages;