// src/App.js
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import UserSettings from './components/UserSettings';
import DummyData from './DummyData';
import Login from './components/Login'
import AddContact from './components/AddContact';
import { createWallet, importWallet, contract } from './utils/CryptoUtils';
import './App.css';
import 'stream-browserify';
import 'crypto-browserify';
import 'assert';

import { Buffer } from 'buffer';
global.Buffer = Buffer;

function App() {
  console.log("Component rendered")
  const [selectedChat, setSelectedChat] = useState(null);
  const [addContactActive, setAddContactActive] = useState(false); // Add this line
  const [selfIdentity, setSelfIdentity] = useState(null);
  
  useEffect(() => {
    const listener = (sender, recipient, content, ipfsMsgHash, timestamp) => {
      console.log('MessageSent event received', { sender, recipient, content, ipfsMsgHash, timestamp });
      // Update your state or UI here
    };

    // Subscribe to MessageSent events
    if(contract) {
      contract.on('MessageSent', listener);
    }

    console.log("Subscribed to events")
    console.log("contract", contract)
    // Unsubscribe from events when component unmounts
    // return () => {
    //   console.log("Unsubscribing from events")
    //   if(contract) {
    //     contract.off('MessageSent', listener);
    //   }
    // };
  }, []);

  const handleCreateWallet = () => {
    const identity = createWallet();
    setSelfIdentity(identity);
  };

  const handleImportWallet = (privateKey) => {
    if (privateKey) {
      const identity = importWallet(privateKey);
      setSelfIdentity(identity);
    }
  };

  const handleAddContact = () => {
    setAddContactActive(true);
  };

  if(selfIdentity === null){
  return <Login handleCreateWallet={handleCreateWallet} handleImportWallet={handleImportWallet}/>;
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
