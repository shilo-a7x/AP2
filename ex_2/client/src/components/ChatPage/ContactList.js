import "./Chat.css";
import Network from "../Network/Network";

const ContactList = ({
    token,
    activeUser,
    setActiveUser,
    currentChat,
    setCurrentChat,
}) => {
    const defaultMessage = "Start chat";

    const parseTime = (lastMessageTime) => {
        const time = new Date(lastMessageTime);
        const formattedTime = time.toLocaleString("he-IL", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        return formattedTime;
    };

    const clampName = (name) => {
        if (name.length > 12) {
            return name.slice(0, 12) + "...";
        }
        return name;
    };

    const clampMessage = (message) => {
        if (message.length > 15) {
            return message.slice(0, 15) + "...";
        }
        return message;
    };

    const handleClick = async (chat) => {
        const contactMessages = await Network.getMessages(chat.id, token);
        if (!contactMessages) {
            alert("Could not get messages");
            return;
        }
        setActiveUser({
            ...activeUser,
            messages: {
                ...activeUser.messages,
                [chat.id]: contactMessages.reverse(),
            },
        });
        setCurrentChat(chat);
    };

    return (
        <ol className="contacts-list">
            {activeUser.chats.map((chat) => (
                <ul
                    key={chat.id}
                    className={
                        currentChat && currentChat.id === chat.id
                            ? "contactSelected"
                            : "contact"
                    }
                    onClick={() => handleClick(chat)}>
                    <div className="info">
                        <img
                            src={chat.user.profilePic}
                            className="contactPic"
                            alt="profile-pic"
                        />
                        <span className="name">
                            {clampName(chat.user.displayName)}
                        </span>
                        <span className="lastMessage">
                            <div className="last-message-date">
                                {chat.lastMessage
                                    ? parseTime(chat.lastMessage.created)
                                    : ""}
                            </div>
                            <div className="last-message">
                                {chat.lastMessage
                                    ? clampMessage(chat.lastMessage.content)
                                    : defaultMessage}
                            </div>
                        </span>
                    </div>
                </ul>
            ))}
        </ol>
    );
};

export default ContactList;
