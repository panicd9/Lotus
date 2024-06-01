// src/components/UserSettings.js
import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import './UserSettings.css'; // Import the CSS file for styling

const ipfs = create('https://ipfs.infura.io:5001/api/v0');

function UserSettings({ user, setUser }) {
  const [nickname, setNickname] = useState(user.nickname);
  const [avatar, setAvatar] = useState(user.avatar);
  const [settingsVisible, setSettingsVisible] = useState(false); // Add this line
  const [addContactActive, setAddContactActive] = useState(false); // Add this line

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const added = await ipfs.add(file);
        setAvatar(`https://ipfs.infura.io/ipfs/${added.path}`);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSave = () => {
    setUser({ nickname, avatar });
  };

  return (
    <div className="user-settings">
            <button onClick={() => setSettingsVisible(!settingsVisible)}>
        {settingsVisible ? 'Hide Settings' : 'Show Settings'}
      </button>
      {settingsVisible && (
        <>
      <h2>User Settings</h2>
        <label>
            Nickname:
        </label>
        <label>
          <input type="text" value={nickname} onChange={handleNicknameChange}/>
        </label>
      <div>
        <label>
            Avatar:
        </label>
        <label>
          <input
            type="file"
            id="file-input"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <button
            className="custom-file-button"
            onClick={() => document.getElementById('file-input').click()}
          >
            Choose File
          </button>
        </label>
        {avatar && <img src={avatar} alt="Avatar" width="100" />}
      </div>
      <button onClick={handleSave}>Save</button>
      </>
      )}
      <button 
        className={`contact-add ${user.addContactActive ? 'contact-add-active' : ''}`} 
        onClick={() => setUser({...user, addContactActive: !user.addContactActive})}
      >
        {user.addContactActive ? 'Add Contact' : 'Add Contact'}
      </button>
      <img src='../icons/lotus-logo.png' alt="Avatar" width="300" className='userSettingsLogo' />
    </div>
  );
}

export default UserSettings;
