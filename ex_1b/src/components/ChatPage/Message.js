import './Chat.css'

const Message = ({ message }) => {
    return (
        <div className={"message message-" + (message.sent ? "sent" : "received")}>
            <p className="message-text">{message.content}</p>
            <span className="message-timestamp">{message.time}</span>
        </div>

    );
};

export default Message;