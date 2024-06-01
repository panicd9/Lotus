// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import UserSettings from './components/UserSettings';
import DummyData from './DummyData';
import Login from './components/Login'
import AddContact from './components/AddContact';
import { createWallet } from './utils/CryptoUtils';
import './App.css';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [addContactActive, setAddContactActive] = useState(false); // Add this line
  const [selfIdentity, setSelfIdentity] = useState(null);
  
  const handleCreateWallet = () => {
    const identity = createWallet();
    setSelfIdentity(identity);
  };

  const handleAddContact = () => {
    setAddContactActive(true);
  };

  if(selfIdentity === null){
  return <Login handleCreateWallet={handleCreateWallet}/>;
  }

  return (
    <div className="app">
      <Sidebar
        groups={DummyData.groups}
        contacts={DummyData.contacts}
        messages={DummyData.messages}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
        setAddContactActive={setAddContactActive}
      />
      {addContactActive ? (
        <AddContact />
      ) : selectedChat ? (
        <ChatWindow chat={selectedChat} messages={DummyData.messages[selectedChat.id]} />
      ) : (
        <div className="no-selection">Select a chat to start messaging</div>
      )}
      <UserSettings addContactActive={addContactActive} setAddContactActive={setAddContactActive} setSelectedChat={setSelectedChat} />
    </div>
  );
}

export default App;
