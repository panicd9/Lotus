import React, { useState } from 'react';

function AddContact() {
    const [addresses, setAddresses] = useState(['']);
  
    const addAddress = () => {
      setAddresses([...addresses, '']);
    };
  
    const handleAddressChange = (index, e) => {
      const newAddresses = [...addresses];
      newAddresses[index] = e.target.value;
      setAddresses(newAddresses);
    };
  
    return (
      <div className="add-contact">
        {addresses.map((address, index) => (
          <input
            key={index}
            type="text"
            value={address}
            onChange={(e) => handleAddressChange(index, e)}
          />
        ))}
        <div className="button-container">
          <button onClick={addAddress}>Add another address</button>
          <button>{addresses.length > 1 ? 'Add Group' : 'Add Contact'}</button>
        </div>
      </div>
    );
  }

export default AddContact;