import React, { useState } from 'react';
import { createWallet, importWallet } from '../utils/CryptoUtils';

function Login({ handleCreateWallet, handleImportWallet }) {
  const [privateKey, setPrivateKey] = useState('');

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  return (
    <div className="login-container">
      <img src= {process.env.PUBLIC_URL + '/icons/lotus-logo.png'} alt="Logo" />
      <form className="login-form">
        <div className="input-group">
          <input type="text" placeholder="Enter your name" className="login-input" onChange={handlePrivateKeyChange}/>
          <button onClick={() => handleImportWallet(privateKey)} type="button" className="login-button import-button">Import</button>
        </div>
        <p className='login-text'>If you don't have an account, you can create one by clicking the 'Create' button.</p>
        <button onClick={handleCreateWallet} type="submit" className="login-button create-button">Create</button>
      </form>
    </div>
  );
}
export default Login;