import { useEffect,useRef } from "react";
import useWebSocket from "react-use-websocket"
import throttle from "lodash.throttle"
import  Avatar from "react-avatar"
import { Cursor } from "./components/Cursor";
const WS_RL = "ws://127.0.0.1:8000";

const renderCursor = users =>{
 return Object.keys(users).map((uuid)=>{
    const user = users[uuid];

    return <Cursor key={uuid} point={[user.state.x,user.state.y]}  />
 })
};
const renderUser = users =>{

 return(
 <ul>
{ Object.keys(users).map((uuid)=>{
    return <Avatar key={uuid} name={users[uuid].username} color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue','cyan',''])} size="50px" round= {true} textMarginRatio={0.15}>  </Avatar>
 })}

</ul>
)
}

const Home = ({user}) => {

     const  {sendJsonMessage,lastJsonMessage} =   useWebSocket(WS_RL,{
            queryParams:{username:user}
        });

        const THROTTLE = 50;
    const sendJsonMessageThrottled =     useRef(throttle(sendJsonMessage,THROTTLE))

useEffect(()=>{
    sendJsonMessage({
        x:0,
        y:0
    })
window.addEventListener("mousemove",(e)=>{
 sendJsonMessageThrottled.current({
    x:e.clientX,
    y: e.clientY
 })
})
},[]) 
    if(lastJsonMessage){
  return (
  <>
  {renderCursor(lastJsonMessage)}
  {renderUser(lastJsonMessage)}
  </>
  )}
}

export default Home
