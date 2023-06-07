const server = "localhost";
const port = 5000;
const urlPrefix = "http://" + server + ":" + port + "/api";

const Network = {
    async register(user) {
        const req = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        };
        const res = await fetch(urlPrefix + "/Users", req);
        return res;
    },
    async login(userName, password, setToken) {
        const req = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName: userName, password: password }),
        };
        const res = await fetch(urlPrefix + "/Tokens", req);
        if (!res.ok) {
            return null;
        }
        const token = await res.text();
        setToken(token);
        const user = await this.getUser(userName, token);
        if (!user) {
            return null;
        }
        const chats = await this.getChats(token);
        if (!chats) {
            return null;
        }
        user.chats = chats;
        return user;
    },
    async getUser(userName, token) {
        const req = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const res = await fetch(urlPrefix + "/Users/" + userName, req);
        if (!res.ok) {
            return null;
        }
        return await res.json();
    },
    async getChats(token) {
        const req = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const res = await fetch(urlPrefix + "/Chats", req);
        if (!res.ok) {
            return null;
        }
        return await res.json();
    },
    async addChat(userName, token) {
        const req = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(userName),
        };
        const res = await fetch(urlPrefix + "/Chats", req);
        if (!res.ok) {
            return null;
        }
        return await res.json();
    },
    async getMessages(id, token) {
        const req = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        const res = await fetch(urlPrefix + "/" + id + "/Messages", req);
        if (!res.ok) {
            return null;
        }
        return await res.json();
    },
};

export default Network;
