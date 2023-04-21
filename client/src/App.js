import './App.css';
import io from 'socket.io-client'     // it help to establish the connection  ;
import {useState} from 'react'
import Chat from './Chat';

const socket=io.connect("http://localhost:3001");  //the url is that where socket.io server is running.

function App() {
  const [username,setUsername]=useState('');
  const [room,setRoom]=useState('');
  const [join,setJoin]=useState(false)

  const joinRoomHandle =()=>{
    if(username!== "" && room!==""){
      socket.emit('join_room',room);     //socket.emit is used to send data to the socket but not using http
      setJoin(true);
    }
  }
  return (
    <div className="App">
      

       {join ? <Chat socket={socket} room={room} username={username}/> : <div className='joinChatContainer'>
        
        <h2>Join the team</h2>
        <input type='text' placholder='Name' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <input type='text' placholder='Team' value={room} onChange={(e)=>{setRoom(e.target.value)}} />
        <button onClick={joinRoomHandle}>Join</button>
      </div> } 
    </div>
  );
}

export default App;
