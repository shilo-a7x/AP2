import './Chat.css'

const Message = ({ message }) => {
    return (
        <div className={"message message-" + (message.sent ? "sent" : "received")}>
            <p className="message-text">{message.content}</p>
            <span className="message-timestamp">9:15</span>
        </div>

    );
};

export default Message;