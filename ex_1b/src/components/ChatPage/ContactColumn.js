import './Chat.css'
import ContactList from "./ContactList";
import { useEffect, useRef, useState } from "react";

const ContactColumn = ({ activeUser, currentChat, setCurrentChat }) => {
    // const contactUsernameInput = useRef(null);
    // const contactNameInput = useRef(null);
    const newContact = useRef('');
    const [activeUserImage, setActiveUserImage] = useState(null);

    // useEffect(() => {
    //     const contactModal = document.getElementById("addContactModal");
    //     contactModal.addEventListener("hidden.bs.modal", () => {
    //         contactUsernameInput.current.value = "";
    //         document.getElementById("add-contact-input").classNameList.remove("is-invalid");
    //         contactNameInput.current.value = "";
    //         document.getElementById("contact-name-input").classNameList.remove("is-invalid");
    //         document.getElementById("contact-server-input").classNameList.remove("is-invalid");
    //     });
    // }, []);

    const addContact = () => {
    }

    // const addContact = async (e) => {
    //     e.preventDefault();
    //     document.getElementById("add-contact-input").classNameList.remove("is-invalid");
    //     document.getElementById("contact-name-input").classNameList.remove("is-invalid");
    //     document.getElementById("contact-server-input").classNameList.remove("is-invalid");
    //     document.getElementById("add-contact-error").innerHTML = "";
    //     document.getElementById("add-contact-name-error").innerHTML = "";
    //     let usernameHasError = false;
    //     let hasError = false;
    //     const requestedContact = contactUsernameInput.current.value.trim();
    //     const requestedContactName = contactNameInput.current.value.trim();
    //     if (requestedContact === "") {
    //         document.getElementById("add-contact-error").innerHTML = "Contact name cannot be empty";
    //         usernameHasError = true;
    //     } else if (requestedContact === user.username) {
    //         document.getElementById("add-contact-error").innerHTML = "You can't add yourself";
    //         usernameHasError = true;
    //     }
    //     if (requestedContactName === "") {
    //         document.getElementById("add-contact-name-error").innerHTML = "Contact name cannot be empty";
    //         document.getElementById("contact-name-input").classNameList.add("is-invalid");
    //         document.getElementById("contact-name-input").classNameList.add("is-invalid");
    //         hasError = true;
    //     }
    //     if (requestedContactServer === "") {
    //         document.getElementById("add-contact-server-error").innerHTML = "Contact server cannot be empty";
    //         document.getElementById("contact-server-input").classNameList.add("is-invalid");
    //         document.getElementById("contact-server-input").classNameList.add("is-invalid");
    //         hasError = true;
    //     }

    //     if (usernameHasError) {
    //         document.getElementById("add-contact-input").classNameList.add("is-invalid");
    //         hasError = true;
    //     }
    //     if (hasError) {
    //         return;
    //     }


    //     const contact = {
    //         "id": contactUsernameInput.current.value,
    //         "name": contactNameInput.current.value,
    //     };

    //     // Create chat
    //     const chat = {
    //         id: requestedContact,
    //         name: contact.name,
    //         messages: []
    //     }
    //     setUser(u => ({
    //         ...u,
    //         chats: { ...u.chats, [requestedContact]: chat }
    //     }));


    //     setMessagesCache({
    //         ...messagesCache, [requestedContact]: ""
    //     });
    //     connection.invoke("MessageSent");
    //     // Clear input field
    //     contactUsernameInput.current.value = "";
    //     // Close modal
    //     document.getElementById("close-modal-button").click();

    // };
    // const handleUsernameKeyPress = (e) => {
    //     document.getElementById("add-contact-input").classNameList.remove("is-invalid");
    //     // If user presses enter, add contact
    //     if (e.key === "Enter") {
    //         addContact(e);
    //         return;
    //     }
    //     //Prevent user from entering invalid characters
    //     if (!/[a-zA-Z0-9-]$/.test(e.key)) {
    //         document.getElementById("add-contact-error").innerHTML = "Username must contain only letters, numbers, and hyphens";
    //         document.getElementById("add-contact-input").classNameList.add("is-invalid");
    //         e.preventDefault();
    //     }
    // }
    // const handleNameKeyPress = (e) => {
    //     document.getElementById("add-contact-name-error").innerHTML = "";
    //     document.getElementById("contact-name-input").classNameList.remove("is-invalid");
    //     // If user presses enter, add contact
    //     if (e.key === "Enter") {
    //         addContact(e);
    //         return;
    //     }
    //     //Prevent user from entering invalid characters
    //     if (!/[a-zA-Z '\-.,]$/.test(e.key)) {
    //         document.getElementById("add-contact-name-error").innerHTML = "Display name can only contain letters, spaces, hyphens, periods, dots, and commas";
    //         document.getElementById("contact-name-input").classNameList.add("is-invalid");
    //         e.preventDefault();
    //     }
    // }

    // // Clear error message on change
    // const clearUsernameError = () => {
    //     document.getElementById("add-contact-input").classNameList.remove("is-invalid");
    //     document.getElementById("add-contact-error").innerHTML = "";
    // }

    return (
        <>
            {/* 
                <span className="user-header">
                    <span className="profile-pic">
                        <img
                            src="media/profile_picture.png"
                            className="center" alt="profile-pic" />
                    </span>
                    <span className="user-header-title">
                        <div className="center">
                            {user.name}
                        </div>
                    </span>
                </span>
                <span className="buttons">
                    <button className="icon-button center" data-bs-toggle="modal" data-bs-target="#addContactModal">
                        <i className="bi bi-person-plus" />
                    </button>
                </span>
            

            */}


            <div className="left-panel">
                <div className="profile">
                    <img
                        src={activeUser?.profilePic}
                        alt="Profile Picture"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <p className="name">{activeUser?.name} no name</p>
                    <button type="button" className="addContactButton" data-bs-toggle="modal"
                        data-bs-target="#addContactModal">
                        <i className="bi bi-person-plus"></i>
                    </button>
                </div>
                <div className="contacts">
                    <ContactList user={activeUser} currentChatID={currentChat}
                        setCurrentChatID={setCurrentChat} />
                </div>
            </div>



            <div className="modal fade" id="addContactModal" tabIndex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addContactModalLabel">Add New Contact</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label ref={newContact} htmlFor="name" className="form-label">Contact Username</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name"></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={addContact} >Add</button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default ContactColumn;

