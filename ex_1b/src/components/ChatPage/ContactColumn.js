import ContactList from "./ContactList";
import { useEffect, useRef, useState } from "react";
import './Chat.css'


const ContactColumn = ({ setUsers, activeUser, currentChat, setCurrentChat }) => {
    // const contactUsernameInput = useRef(null);
    const contactNameInput = useRef(null);
    const newContact = useRef('');

    useEffect(() => {
        console.log(activeUser)
    }, [])

    const addContact = () => {
        const requestedContact = contactNameInput.current.value;

        const contact = {
            "name": newContact.current.value,
        };

        const chat = {
            name: contact.name,
            messages: []
        }

        setUsers(u => ({
            ...u,
            chats: { ...u.chats, [requestedContact]: chat }
        }));

        document.getElementById("close-btn").click();
    }

    // // Clear error message on change
    // const clearUsernameError = () => {
    //     document.getElementById("add-contact-input").classNameList.remove("is-invalid");
    //     document.getElementById("add-contact-error").innerHTML = "";
    // }

    return (
        <>
            <div className="left-panel">
                <div className="profile">
                    <img
                        src={activeUser?.profilePic}
                        alt="lol"
                    />
                    <p className="name">{activeUser?.nick}</p>
                    <button type="button" className="addContactButton" data-bs-toggle="modal"
                        data-bs-target="#addContactModal">
                        <i className="bi bi-person-plus"></i>
                    </button>
                </div>
                <div class="contact-list">
                    <div className="contacts">

                        <ContactList user={activeUser} currentChatID={currentChat}
                            setCurrentChatID={setCurrentChat} />
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addContactModal" tabIndex="-1" aria-labelledby="addContactModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addContactModalLabel">Add New Contact</h5>
                            <button type="button" className="btn-close" id="close-btn" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label ref={newContact} htmlFor="name" className="form-label">Contact Username</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name"
                                        maxLength="15"></input>
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