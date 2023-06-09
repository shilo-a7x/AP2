const express = require("express");
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const routes = require("./routes/Routes");
const http = require("http");

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    transports: ["websocket"],
    cors: {
        allowedHeaders: "http://localhost:3000",
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log("User joined room", roomId);
    });

    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
        console.log("User left room", roomId);
    });

    socket.on("chat", (data) => {
        console.log("Chat received:", data);
        const { roomId, message } = data;
        io.to(roomId).emit("chat", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

// Connect to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/chats", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes
app.use("/api", routes);

// Serve static files from the React app
app.use(express.static("public"));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile("public/index.html");
});

// Server runs on port 5000
httpServer.listen(5000, () => {
    console.log("Server is running on port 5000");
});
