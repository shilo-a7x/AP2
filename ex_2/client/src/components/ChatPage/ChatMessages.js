import "./Chat.css";

const ChatMessages = ({ activeUser, currentChat }) => {
    const parseTime = (time) => {
        const t = new Date(time);
        const formattedTime = t.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        return formattedTime;
    };

    return (
        <ol className="chat">
            {activeUser.messages[currentChat.id].map((message, index) => (
                <ul key={message.id || index} className="chat-list">
                    <div
                        className={
                            message.sender.username === activeUser.username
                                ? "message sent"
                                : "message received"
                        }>
                        <p className="text">{message.content}</p>
                        <span className="message-timestamp">
                            {parseTime(message.created)}
                        </span>
                    </div>
                </ul>
            ))}
        </ol>
    );
};

export default ChatMessages;
