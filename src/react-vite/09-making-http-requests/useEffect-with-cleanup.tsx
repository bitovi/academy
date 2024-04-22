import { useEffect, useState } from "react"

function WebSocketComponent() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const socket = new WebSocket("wss://chat.donejs.com/")

    socket.onmessage = (event) => {
      setMessages((previousMessages) => {
        return [...previousMessages, event.data]
      })
    }

    return () => {
      // Clean up (tear down) the socket connection
      return socket.close()
    }
  }, [])

  return (
    <ol>
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ol>
  )
}

export default WebSocketComponent
