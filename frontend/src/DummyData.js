// src/DummyData.js
const DummyData = {
    groups: [
      { id: 'group1', name: 'Friends', image: 'userIcon.jpg' },
      { id: 'group2', name: 'Family', image: 'userIcon.jpg' },
      { id: 'group3', name: 'Work', image: 'userIcon.jpg' }
    ],
    contacts: [
      { sender: 'Alice', name: 'Alice', image: 'userIcon.jpg' },
      { sender: 'Bob', name: 'Bob', image: 'userIcon.jpg' },
      { sender: 'Charlie', name: 'Charlie', image: 'userIcon.jpg' },
      { sender: 'Boss', name: 'Boss', image: 'userIcon.jpg' },
    ],
    messages: {
      'Alice': [
        { recipient: 'group1', content: 'Hello Friends!', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group2', content: 'Hi Family!', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group3', content: 'Got it!', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact1', content: 'What\'s up?', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact3', content: 'Hi Charlie!', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group1', content: 'New message 1', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group2', content: 'New message 2', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group3', content: 'New message 3', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact1', content: 'New message 4', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact3', content: 'New message 5', ipfsMsgHash: "QmASDF", timestamp: Date.now() }
      ],
      'Bob': [
        { recipient: 'group1', content: 'How are you all?', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact1', content: 'Hey Alice!', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact2', content: 'Let\'s catch up!', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group1', content: 'New message 1', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group2', content: 'New message 2', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group3', content: 'New message 3', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact1', content: 'New message 4', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact3', content: 'New message 5', ipfsMsgHash: "QmASDF", timestamp: Date.now() }
      ],
      'Charlie': [
        { recipient: 'group2', content: 'Miss you all!', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact2', content: 'Hello Bob!', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact3', content: 'Long time no see!', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group1', content: 'New message 1', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group2', content: 'New message 2', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group3', content: 'New message 3', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact1', content: 'New message 4', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact3', content: 'New message 5', ipfsMsgHash: "QmASDF", timestamp: Date.now() }
      ],
      'Boss': [
        { recipient: 'group3', content: 'Work meeting at 3 PM', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group1', content: 'New message 1', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group2', content: 'New message 2', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'group3', content: 'New message 3', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact1', content: 'New message 4', ipfsMsgHash: "QmASDF", timestamp: Date.now() },
        { recipient: 'contact3', content: 'New message 5', ipfsMsgHash: "QmASDF", timestamp: Date.now() }
      ]
    }
  };
  
  export default DummyData;
  