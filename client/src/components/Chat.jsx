import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
import '../chatting.css'

const Chat = ({socket,room,username}) => {
    const [currentMessage,setCurrentMessage]=useState('');
    const [messageList,setMessageList]=useState([]);
    const sendMessage=async()=>{
        if(currentMessage!==""){

            const messageData={
                room : room,
                author : username,
                message : currentMessage,
                time:new Date(Date.now()).getHours() +" : " + new Date(Date.now()).getMinutes()
            }
            
            await socket.emit("send_message",messageData);
            setMessageList((prelist)=>[...prelist,messageData])
            setCurrentMessage('');
        }
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            console.log(data);
            setMessageList((prelist)=>[...prelist,data])
    })},[socket]);


  return (
    <div className='chat-window'>

        <div className='chat-header'>
            <p>Live chat in {room}</p>
        </div>

        <div className='chat-body'>
            <ScrollToBottom className='message-container'>

            {messageList.map(data=>{
                
                return (

                 <div 
                        className='message' id={username === data.author ? 'you':'other'}>
                    <div>
                        <div className="message-content">
                            <p>{data.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id='time'>{data.time}</p>
                            <p id='author'>{data.author}</p>
                        </div>
                    </div>
                </div>
                ) 
                })}
            </ScrollToBottom>
        </div>

        <div className='chat-footer'>
            <input type='text' 
                placeholder='Messages....' value={currentMessage} 
                onChange={(e)=>setCurrentMessage(e.target.value)}
                onKeyPress={(e)=>{
                    e.key==='Enter' && sendMessage();
                }}
            />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
      
    </div>
  )
}

export default Chat
