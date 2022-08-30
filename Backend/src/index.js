const express= require("express")
const socket=require("socket.io")
const app=express()
const server= require("./server")
const register= require("./Controller/register")
const login= require("./Controller/login")
const user= require("./Controller/user.controller")

const message= require("./Controller/message.controller")
const cors=require("cors")
app.use(cors())

app.use(express.json())
app.use("/register",register)
app.use("/login",login)
app.use("/getuser",user)
app.use("/message",message)


const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        });
  
socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });


module.exports =app