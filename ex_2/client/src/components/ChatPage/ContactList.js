import "./Chat.css";

const ContactList = ({ activeUser, currentChat, setCurrentChat }) => {
    const defaultMessage = "start chat";

    return (
        <ol className="contacts-list">
            {Object.entries(activeUser.chats).map(([chatID, chat]) => (
                <ul
                    key={chatID}
                    className={
                        currentChat !== -1 && currentChat === chatID
                            ? "contactSelected"
                            : "contact"
                    }
                    onClick={() => {
                        setCurrentChat(chatID);
                    }}>
                    <div className="info">
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                "/profilePic/noFace.png"
                            }
                            className="contactPic"
                            alt="profile-pic"
                        />
                        <span className="name">
                            {chat.name.length > 12
                                ? chat.name.slice(0, 12) + "..."
                                : chat.name}
                        </span>
                        <span className="lastMessage">
                            <div className="last-message-date">
                                {chat.messages?.at(-1)?.time || ""}{" "}
                            </div>
                            <div className="last-message">
                                {(
                                    chat.messages?.at(-1)?.content ||
                                    defaultMessage
                                ).length > 15
                                    ? (
                                          chat.messages?.at(-1)?.content ||
                                          defaultMessage
                                      ).slice(0, 15) + "..."
                                    : chat.messages?.at(-1)?.content ||
                                      defaultMessage}
                            </div>
                        </span>
                    </div>
                </ul>
            ))}
        </ol>
    );
};

export default ContactList;
