// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import UserSettings from './components/UserSettings';
import DummyData from './DummyData';
import Login from './components/Login'
import AddContact from './components/AddContact';
import './App.css';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState(null);
  if(!user){
  return <Login setUser={setUser} />;
  }

  return (
    <div className="app">
      <Sidebar
        groups={DummyData.groups}
        contacts={DummyData.contacts}
        messages={DummyData.messages}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
      />
      {user.addContactActive ? (
        <AddContact />
      ) : selectedChat ? (
        <ChatWindow chat={selectedChat} messages={DummyData.messages[selectedChat.id]} />
      ) : (
        <div className="no-selection">Select a chat to start messaging</div>
      )}
      <UserSettings user={user} setUser={setUser} />
    </div>
  );
}

export default App;
