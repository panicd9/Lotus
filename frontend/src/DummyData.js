// src/DummyData.js
const DummyData = {
    groups: [
      { id: 'group1', name: 'Friends' },
      { id: 'group2', name: 'Family' },
      { id: 'group3', name: 'Work' }
    ],
    contacts: [
      { id: 'contact1', name: 'Alice' },
      { id: 'contact2', name: 'Bob' },
      { id: 'contact3', name: 'Charlie' }
    ],
    messages: {
      group1: [
        { id: 'msg1', text: 'Hello Friends!', sender: 'Alice' },
        { id: 'msg2', text: 'How are you all?', sender: 'Bob' }
      ],
      group2: [
        { id: 'msg1', text: 'Hi Family!', sender: 'Alice' },
        { id: 'msg2', text: 'Miss you all!', sender: 'Charlie' }
      ],
      group3: [
        { id: 'msg1', text: 'Work meeting at 3 PM', sender: 'Boss' },
        { id: 'msg2', text: 'Got it!', sender: 'Alice' }
      ],
      contact1: [
        { id: 'msg1', text: 'Hey Alice!', sender: 'Bob' },
        { id: 'msg2', text: 'What\'s up?', sender: 'Alice' }
      ],
      contact2: [
        { id: 'msg1', text: 'Hello Bob!', sender: 'Charlie' },
        { id: 'msg2', text: 'Let\'s catch up!', sender: 'Bob' }
      ],
      contact3: [
        { id: 'msg1', text: 'Hi Charlie!', sender: 'Alice' },
        { id: 'msg2', text: 'Long time no see!', sender: 'Charlie' }
      ]
    }
  };
  
  export default DummyData;
  