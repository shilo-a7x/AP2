import ContactList from "./ContactList";
import { useRef } from "react";
import Network from "../Network/Network";
import "./Chat.css";

const ContactColumn = ({
    token,
    setActiveUser,
    activeUser,
    currentChat,
    setCurrentChat,
}) => {
    const newContact = useRef(null);

    const addContact = async (e) => {
        e.preventDefault();
        const newContactName = newContact.current.value;
        if (activeUser.username === newContactName) {
            alert("Thou shalt not talk with thy self");
            return;
        }

        const newChat = await Network.addChat(newContactName, token);
        if (!newChat) {
            alert("Contact does not exist");
            return;
        }

        setActiveUser((u) => ({
            ...u,
            chats: [...u.chats, newChat],
        }));
        newContact.current.value = "";
        document.getElementById("close-btn").click();
    };

    const checkRegex = (e) => {
        if (!/[a-zA-Z0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <>
            <div className="left-panel">
                <div className="profile">
                    <img src={activeUser?.profilePic} alt="profile pic" />
                    <p className="name">{activeUser?.displayName}</p>
                    <button
                        type="button"
                        className="addContactButton"
                        data-bs-toggle="modal"
                        data-bs-target="#addContactModal">
                        <i className="bi bi-person-plus"></i>
                    </button>
                </div>
                <div className="contact-list">
                    <div className="contacts">
                        <ContactList
                            token={token}
                            activeUser={activeUser}
                            setActiveUser={setActiveUser}
                            currentChat={currentChat}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="addContactModal"
                tabIndex="-1"
                aria-labelledby="addContactModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="addContactModalLabel">
                                Add New Contact
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                id="close-btn"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addContact}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label">
                                        Contact Username
                                    </label>
                                    <input
                                        ref={newContact}
                                        onKeyDown={checkRegex}
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter name"
                                        maxLength="25"></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={addContact}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactColumn;
