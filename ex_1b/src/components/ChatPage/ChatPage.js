import ContactsSection from "./ContactsSection"
import ChatSection from "./ChatSection";
import "./Chat.css";
import { useEffect, useState, useCallback } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { getContacts, getMessages } from "../Auth/SignIn/SignInForm";

const ChatPage = ({ user }) => {
    const [currentChatID, setCurrentChatID] = useState(-1);
    const [hasToUpdate, setHasToUpdate] = useState(false);
    const [connection, setConnection] = useState(null);
    // Create a cache for the messages the user has written to each contact
    const [messagesCache, setMessagesCache] = useState(Object.assign({}, ...Object.keys(user.chats).map((id) => {
        return {
            [id]: ""
        }
    })));

    return (
        <div class="container">
            <div class="left-panel">
                <ChatSection user={user}
                    setUser={setUser}
                    token={token}
                    currentChatID={currentChatID}
                    messagesCache={messagesCache}
                    setMessagesCache={setMessagesCache}
                    theme={theme} setTheme={setTheme} />
            </div>
            <div class="right-panel">
                <ContactsSection user={user}
                    setUser={setUser}
                    token={token}
                    currentChatID={currentChatID}
                    setCurrentChatID={setCurrentChatID}
                    messagesCache={messagesCache}
                    setMessagesCache={setMessagesCache}
                    connection={connection} />
            </div>
        </div>
    );
};

export default ChatPage;