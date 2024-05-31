// src/components/ChatWindow.js
import React from 'react';

function ChatWindow({ chat, messages }) {
  return (
    <div className="chat-window">
      <h2>{chat.name}</h2>
      <ul className="messages">
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.sender}: </strong> {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatWindow;
