import './Chat.css'

const Contacts = ({ user, setUser, currentChatID, setCurrentChatID }) => {
    const selectChat = (chatID) => {
        setCurrentChatID(chatID);
        // Mark as read
        setUser({
            ...user, chats: Object.fromEntries(Object.entries(user.chats).map(([id, chat]) => {
                if (id === chatID) {
                    return [id, { ...chat, "unreadMessages": 0 }];
                }
                return [id, chat];
            }))
        });
    }

    return (
        <div className="contact" onClick={selectChat}>
            <div class="info">
                <img src="pics/niceMan.jpg" />
                <span class="name"></span>
                <span class="last-message"></span>
                <p class="last-message-date">21/04/2023 11:15 pm</p>
            </div>
        </div>
    );
}

export default Contacts;