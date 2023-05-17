import React from 'react'
// import Chatting from './pages/Chatting'
import Video from './pages/Video'
import { ContextProvider } from './SocketContext'

const App = () => {
  return (
    <div>
      {/* <Chatting/> */}
      <ContextProvider>
        <Video/>
      </ContextProvider>
    </div>
  )
}

export default App
