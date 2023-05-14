import './Chat.css'
import { useState } from 'react';

const ContactList = ({ user, currentChat, setCurrentChat }) => {
    const [contacts, setContacts] = useState([]);

    return (
        <ol className="contacts-list">
            {contacts.map(([chatID, chat]) => (
                <ul key={chatID}
                    className={(currentChat !== -1 && currentChat === chatID) ? "contactSelected" : "contact"}
                    onClick={() => {
                        setCurrentChat(chatID);
                    }}>
                    <span className="user-header">
                        <span className="profile-pic">
                            <img
                                src="media/profile_picture.png"
                                className="center" alt="profile-pic" />
                        </span>
                        <span className="contact-info">
                            <div className="center">
                                <h6 className="contact-name">
                                    {chat.name}
                                </h6>
                                <h6 className="last-message-sent">
                                    {(chat.messages.length) ? chat.messages.at(-1).content : ''}
                                </h6>
                            </div>
                        </span>
                    </span>
                </ul>
            ))}
        </ol>
    );
}

export default ContactList;
