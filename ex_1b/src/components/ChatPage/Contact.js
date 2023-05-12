import './Chat.css'

const Contact = ({ name, lastMassage }) => {

    return (
        <div className="contact" onClick={selectChat}>
            <div className="info">
                <img src="pics/niceMan.jpg" />
                <span className="name">{name}</span>
                <span className="last-message">{lastMassage}</span>
                <p className="last-message-date">21/04/2023 11:15 pm</p>
            </div>
        </div>
    );
}

export default Contact;