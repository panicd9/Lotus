import React, { useState } from 'react';
import { createWallet, importWallet } from '../utils/CryptoUtils';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    // If successful, call setUser with the logged in user's data
    setUser({ nickname: username, avatar: '' });
  };

  return (
    <div className="login-container">
      <img src= {process.env.PUBLIC_URL + '/icons/lotus-logo.png'} alt="Logo" />
      <form className="login-form">
        <div className="input-group">
          <input type="text" placeholder="Enter your name" className="login-input" />
          <button onClick={handleLogin} type="button" className="login-button import-button">Import</button>
        </div>
        <p className='login-text'>If you don't have an account, you can create one by clicking the 'Create' button.</p>
        <button onClick={handleLogin} type="submit" className="login-button create-button">Create</button>
      </form>
    </div>
  );
}
export default Login;