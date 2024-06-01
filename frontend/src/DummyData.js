// src/DummyData.js
const DummyData = {
    groups: [
      { id: 'group1', name: 'Friends', image: 'userIcon.jpg' },
      { id: 'group2', name: 'Family', image: 'userIcon.jpg' },
      { id: 'group3', name: 'Work', image: 'userIcon.jpg' }
    ],
    contacts: [
      { id: 'contact1', name: 'Alice', image: 'userIcon.jpg' },
      { id: 'contact2', name: 'Bob', image: 'userIcon.jpg' },
      { id: 'contact3', name: 'Charlie', image: 'userIcon.jpg' }
    ],
    messages: {
      group1: [
        { id: 'msg1', text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', sender: 'Alice', time: Date.now() },
        { id: 'msg2', text: 'How are you all?Hello Friends!Hello Friends!Hello Friends!Hello Friends!Hello Friends!Hello Friends!', sender: 'Bob', time: Date.now() - 9999999999 }
      ],
      group2: [
        { id: 'msg1', text: 'Hi Family!', sender: 'Alice', time: Date.now() },
        { id: 'msg2', text: 'Miss you allMiss you allMiss you allMiss you allMiss you allMiss you allMiss you allMiss you allMiss you all!', sender: 'Charlie', time: Date.now() }
      ],
      group3: [
        { id: 'msg1', text: 'Work meeting at 3 PM', sender: 'Boss', time: Date.now() },
        { id: 'msg2', text: 'Got it!', sender: 'Alice', time: Date.now() }
      ],
      contact1: [
        { id: 'msg1', text: 'Hey Alice!', sender: 'Bob', time: Date.now() },
        { id: 'msg2', text: 'What\'s up?', sender: 'Alice', time: Date.now() }
      ],
      contact2: [
        { id: 'msg1', text: 'Hello Bob!', sender: 'Charlie', time: Date.now() },
        { id: 'msg2', text: 'Let\'s catch up!', sender: 'Bob', time: Date.now() }
      ],
      contact3: [
        { id: 'msg1', text: 'Hi Charlie!', sender: 'Alice', time: Date.now() },
        { id: 'msg2', text: 'Long time no see!', sender: 'Charlie', time: Date.now() }
      ]
    }
  };
  
  export default DummyData;
  