const server = "localhost";
const port = 5000;
const urlPrefix = "http://" + server + ":" + port + "/api";

const Network = {
    async register(user) {
        const request = {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        };
        const res = await fetch(urlPrefix + "/Users", request);
        return res;
    },
};

export default Network;
