// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import UserSettings from './components/UserSettings';
import DummyData from './DummyData';
import './App.css';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState({ nickname: 'Anonymous', avatar: '' });

  return (
    <div className="app">
      <Sidebar
        groups={DummyData.groups}
        contacts={DummyData.contacts}
        messages={DummyData.messages}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      {selectedChat ? (
        <ChatWindow chat={selectedChat} messages={DummyData.messages[selectedChat.id]} />
      ) : (
        <div className="no-selection">Select a chat to start messaging</div>
      )}
      <UserSettings user={user} setUser={setUser} />
    </div>
  );
}

export default App;
