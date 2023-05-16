import './Chat.css'

const ContactList = ({ activeUser, currentChat, setCurrentChat }) => {

    return (
        <ol className="contacts-list">
            {Object.entries(activeUser.chats).map(([chatID, chat]) => (
                <ul key={chatID}
                    className={(currentChat !== -1 && currentChat === chatID) ? "contactSelected" : "contact"}
                    onClick={() => {
                        setCurrentChat(chatID);
                    }}>
                    <div className="info">
                        <img
                            src={process.env.PUBLIC_URL + '/profilePic/noFace.png'}
                            className="contactPic" alt="profile-pic" />
                        <span className="name">{chat.name}</span>
                        <div className="lastMessage">
                            <div className="last-message-date">23/04/2023 4:15 pm</div>
                            <div className="last-message">{(chat.messages.length) ? chat.messages.at(-1).content : 'no message sent'}</div>
                        </div>
                    </div>
                </ul>
            ))}
        </ol>
    );
}

export default ContactList;
