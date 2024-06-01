// src/components/Sidebar.js
import React, { useState } from 'react';
import { unixToHumanReadable } from '../utils';

function Sidebar({ groups, contacts, messages, onSelectChat, selectedChat, setAddContactActive }) {
	const [filter, setFilter] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');

	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredGroups = groups.filter((group) =>
		group.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const filteredContacts = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const getLastMessage = (id) => {
		const chatMessages = messages[id];
		return chatMessages && chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].text : '';
	};

	const getLastMessageTime = (id) => {
		const chatMessages = messages[id];
		return chatMessages && chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].time : '';
	  };

	return (
		<div className="sidebar">
			<h2>Chat</h2>
			<div className="filter">
				<input
					id="all"
					type="radio"
					value="all"
					checked={filter === 'all'}
					onChange={handleFilterChange}
				/>
				<label htmlFor="all">All</label>

				<input
					id="groups"
					type="radio"
					value="groups"
					checked={filter === 'groups'}
					onChange={handleFilterChange}
				/>
				<label htmlFor="groups">Groups</label>

				<input
					id="contacts"
					type="radio"
					value="contacts"
					checked={filter === 'contacts'}
					onChange={handleFilterChange}
				/>
				<label htmlFor="contacts">Contacts</label>
			</div>
			<div className="search">
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</div>
			{filter !== 'contacts' && (
				<>
					<h2>Groups</h2>
					<ul>
						{filteredGroups.map((group) => (
							<div
								key={group.id}
								className={`contact-item ${selectedChat && selectedChat.id === group.id ? 'active' : ''}`}
								onClick={() => {
									onSelectChat(group)
									setAddContactActive(false);
								}}
							>
								<img src={process.env.PUBLIC_URL + '/icons/' + group.image} className='profileIcons'/>
								<div className='sidebarProfileName'><div className="contact-name">{group.name}</div><div className="contact-last-message-time">{unixToHumanReadable(getLastMessageTime(group.id))}</div></div>
								<div className="contact-last-message">{getLastMessage(group.id)}</div>
							</div>
						))}
					</ul>
				</>
			)}
			{filter !== 'groups' && (
				<>
					<h2>Contacts</h2>
					<ul>
						{filteredContacts.map((contact) => (
							<div
								key={contact.id}
								className={`contact-item ${selectedChat && selectedChat.id === contact.id ? 'active' : ''}`}
								onClick={() => {
									onSelectChat(contact)
									setAddContactActive(false);
								}}
							>
								<img src={process.env.PUBLIC_URL + '/icons/' + contact.image} className='profileIcons'/>
								<div className='sidebarProfileName'><div className="contact-name">{contact.name}</div><div className="contact-last-message-time">{unixToHumanReadable(getLastMessageTime(contact.id))}</div></div>
								<div className="contact-last-message">{getLastMessage(contact.id)}</div>
							</div>
						))}
					</ul>
				</>
			)}
		</div>
	);
}

export default Sidebar;
