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
  
    const deleteAddress = (index) => {
      const newAddresses = [...addresses];
      newAddresses.splice(index, 1);
      setAddresses(newAddresses);
    };
  
    return (
      <div className="add-contact">
        {addresses.map((address, index) => (
          <div className='labelInput' key={index}>
            <input
              type="text"
              value={address}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <button className='deleteButton' onClick={() => deleteAddress(index)}>X</button>
          </div>
        ))}
        <div className="button-container">
          <button onClick={addAddress}>Add another address</button>
          <button>{addresses.length > 1 ? 'Add Group' : 'Add Contact'}</button>
        </div>
      </div>
    );
  }

export default AddContact;