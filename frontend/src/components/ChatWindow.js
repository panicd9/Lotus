// src/components/ChatWindow.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import { sendMessage } from '../utils/CryptoUtils';
import { contract } from '../utils/CryptoUtils';

function ChatWindow({ chat, messages }) {
  function handleSend() {
    const message = document.getElementById('message-input').value;
    console.log('Sending message:', message);
    sendMessage(message, "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720")
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
  }

  return (
    <div className="chat-window">
      <div className='chatWindowUpper flex-container'>
        <div>{chat.name}</div>
        <button className='notify-button'>
          {chat.type === 'group' ? 'Notify Participants' : 'Notify Other'}
        </button>
      </div>
      <ul className="messages">
        {messages.map((message) => (
          <li key={message.id} className="message-item-right">
            <div className='message-content-right'>
              <div className="message-text-right">{message.text}</div>
            </div>
            <img src={process.env.PUBLIC_URL + '/icons/userIcon.jpg'} className='chatProfileIcons-right'/>
          </li>
        ))}
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
      <div className="message-input-container">
        <input id="message-input" type="text" className="message-input" placeholder="Type a message..." />
        <label for="file-input" className="file-input-label">Choose file</label>
        <input id="file-input" type="file" className="file-input" />
        <button className="send-button" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
