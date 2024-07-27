const http = require("http");
const {WebSocketServer} = require("ws")
const url = require("url");
const PORT = 8000;


const server = http.createServer();

const wServer = new WebSocketServer({server});
const uuidv4 = require("uuid").v4;
const connections = {};
const users = {}


const broadCastUsers = () => {
    Object.keys(connections).forEach(uuid =>{
            const connection = connections[uuid];
            const message = JSON.stringify(users);
            connection.send(message);
    })
}



const handleMessage = (bytes , uuid)=>{
const message = JSON.parse(bytes.toString());
const user = users[uuid]
user.state = message;
broadCastUsers();
console.log(`${user.username} update their state : ${JSON.stringify(user.state)}`)

};
const handleClose = (uuid) =>{
    console.log(`${users[uuid].username} disconnected`);
    delete connections[uuid];
    delete users[uuid]

}




wServer.on("connection",(connection,req)=>{
    const {username} = url.parse(req.url,true).query;
    const uuid = uuidv4();
        connections[uuid] = connection;
    console.log(username);
    console.log(uuid)
        users[uuid] ={
            username,
            state:{ }
        }

    connection.on("message",message=>handleMessage(message,uuid));
    connection.on("close",()=>handleClose(uuid));
})


server.listen(PORT,()=>{
    console.log(`Websocket Server is running on Port :${PORT}`);
})