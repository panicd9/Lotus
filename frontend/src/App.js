// src/App.js
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import UserSettings from './components/UserSettings';
import DummyData from './DummyData';
import Login from './components/Login'
import AddContact from './components/AddContact';
import { createWallet, importWallet, contract, decryptMessage, selfIdentity as si} from './utils/CryptoUtils';
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
  const [messages, setMessages] = useState(DummyData.messages);
  
  useEffect(() => {
    console.log("Updated messages: ", messages);
  }, [messages]);

  useEffect(() => {
    const listener = async (sender, recipient, content, ipfsMsgHash, timestamp) => {
      console.log('MessageSent event received', { sender, recipient, content, ipfsMsgHash, timestamp });
      // Update your state or UI here

      if(recipient !== si.address ) {
        setMessages(prevMessages => {
          // Copy the previous messages map
          const updatedMessages = { ...prevMessages };
        
          // If the sender doesn't exist in the map, add them
          if (!updatedMessages[sender]) {
            updatedMessages[sender] = [];
          }
        
          // Add the new message to the sender's array
          // Sender cant decrypt message because its encrypted with recipients private key!
          // updatedMessages[sender].push({ sender, recipient, content: "Hello ETH Belgrade!", ipfsMsgHash, timestamp });
          console.log("Adding message to Alice")
          console.log("recipient: ", recipient)
          updatedMessages.Alice.push({ sender, recipient, content: "Hello ETH Belgrade!", ipfsMsgHash, timestamp });
        
          return updatedMessages;
        });
        return;
      } else {
        
      }
      console.log("MESSAGES: ", messages)
      const decryptedContent = await decryptMessage(content);
      setMessages(prevMessages => {
        // Copy the previous messages map
        const updatedMessages = { ...prevMessages };
      
        // If the sender doesn't exist in the map, add them
        if (!updatedMessages[sender]) {
          updatedMessages[sender] = [];
        }
      
        // Add the new message to the sender's array
        // updatedMessages[sender].push({ sender, recipient, decryptedContent, ipfsMsgHash, timestamp });
        updatedMessages.Alice.push({ sender, recipient, decryptedContent, ipfsMsgHash, timestamp });
      
        return updatedMessages;
      });
    };


    // Subscribe to MessageSent events
    if(contract) {
      contract.on('MessageSent', listener);
      console.log("Subscribed to events")
    }

    
    console.log("contract", contract)
    // Unsubscribe from events when component unmounts
    return () => {
      console.log("Unsubscribing from events")
      if(contract) {
        contract.off('MessageSent', listener);
      }
    };
  }, [contract]);

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

  function getMessagesWithContact(sender) {
    console.log("Getting messages with contact: ", sender)
    console.log(messages[sender])
    if (sender !== 'Alice' && sender !== 'Bob' && sender !== 'Charlie' && sender !== 'Boss') {
      return messages.Alice;
    } else {
      return messages[sender];
    }
    
  }

  return (
    <div className="app">
      <Sidebar
        groups={DummyData.groups}
        contacts={DummyData.contacts}
        messages={messages}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
        setAddContactActive={setAddContactActive}
      />
      {addContactActive ? (
        <AddContact />
      ) : selectedChat ? (
        <ChatWindow chat={selectedChat} messages={getMessagesWithContact(selectedChat?.name)} selfIdentity={si} />
      ) : (
        <div className="no-selection">Select a chat to start messaging</div>
      )}
      <UserSettings addContactActive={addContactActive} setAddContactActive={setAddContactActive} setSelectedChat={setSelectedChat} />
    </div>
  );
}

export default App;
