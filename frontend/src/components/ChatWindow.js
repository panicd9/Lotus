// src/components/ChatWindow.js
import React from 'react';
import { senderToImage } from '../utils';

function ChatWindow({ chat, messages }) {
  return (
    <div className="chat-window">
      <div className='chatWindowUpper'>{chat.name}</div>
      <ul className="messages">
        {messages.map((message) => (
          <li key={message.id} className="message-item">
            <img src={process.env.PUBLIC_URL + '/icons/userIcon.jpg'} className='chatProfileIcons'/>
            <div className='message-content'>
              <div className="message-sender">{message.sender}</div>
              <div className="message-text">{message.text}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatWindow;
