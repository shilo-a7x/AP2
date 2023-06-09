# Ex2 web-api

## Features

-   A node.js server dedicated to a chat-app:
    -   User verification with JWT
    -   All data like users, chats and messages is stored using MongoDB
    -   Real time communication between and to clients
-   Brief of the api:
    -   Users:
        -   <kbd>GET</kbd> /api/Users/{username}
        -   <kbd>POST</kbd> /api/Users
    -   Tokens:
        -   <kbd>POST</kbd> /api/Tokens
    -   Chats:
        -   <kbd>GET</kbd> /api/Chats
        -   <kbd>POST</kbd> /api/Chats
        -   <kbd>GET</kbd> /api/Chats/{id}
        -   <kbd>DELETE</kbd> /api/Chats/{id}
        -   <kbd>POST</kbd> /api/Chats/{id}/Messages
        -   <kbd>GET</kbd> /api/Chats/{id}/Messages

## Installation

```shell
git clone https://github.com/shilo-a7x/AP2.git
cd AP2/ex_2/server
npm install
```

## Libraries used

-   `body-parser`
-   `cors`
-   `express`
-   `jsonwebtoken`
-   `mongoose`
-   `socket.io`

**_Installation of MongoDB is required!_**

## Running

```shell
node app.js
```

The server's port is 5000
The server has a standalone version of the chat-app at http://localhost:5000

<br>

**Enjoy!**

![Pardon it's a me Cop](public/profilePic/cop.png)
