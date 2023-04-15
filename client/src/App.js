import './App.css';
import io from 'socket.io-client'     // it help to establish the connection  ;

const socket=io.connect("http://localhost:3001");  //the url is that where socket.io server is running.

function App() {
  return (
    <div className="App">
      dfg
    </div>
  );
}

export default App;
