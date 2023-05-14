import './Chat.css'
import { useState } from 'react';

function ContactForm({ addContact, username, ContactList }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Create a new contact object
      const newContact = {
        name: name,
        phone: phone
      };
  
      // Call the addContact function passed as prop
      addContact(newContact);
  
      // Clear the form inputs
      setName('');
      setPhone('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>
    );
  }

const List = ({ contacts }) => {
    return (
        <ul>
            {contacts.map((contact, index) => (
                <li className="contact" key={index}>
                    <div className="info">
                        <img src="pics/niceMan.jpg" />
                        <span className="name">{contact.name}</span>
                        <span className="last-message">{contact.lastMassage}</span>
                        <p className="last-message-date">21/04/2023 11:15 pm</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

const ContactList = ({ name, lastMassage, /*contacts */ }) => {
    const [contacts, setContacts] = useState([]);

    const addContact = (newContact) => {
        // Update the contact list with the new contact
        setContacts([...contacts, newContact]);
      };

    return (
        <div>
      <ContactForm addContact={addContact} name={name}  />
      <List contacts={contacts} name={name} lastMassage={lastMassage} />
    </div>
    );
}

export default ContactList;