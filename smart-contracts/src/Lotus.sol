// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {console} from "forge-std/console.sol";

contract Lotus {
    struct PublicKey {
        bytes32 half1;
        bytes32 half2;
    }

    struct Group {
        // Keccak256 hash of sorted addresses of participants
        bytes32 id;
        address[] members;
        string name;
        uint32 numOfParticipants;
    }

    mapping(address user => PublicKey) public s_addressToPublicKey;
    mapping(address sender => mapping(address recipient => bytes32[] ipfsMsgHash)) public s_senderToRecipientMessages;
    mapping(address user1 => address[] user2) s_activeChatsArr;
    mapping(address user1 => mapping(address user2 => bool)) s_isChatActive;
    mapping(address user1 => bytes32[] groups) s_activeGroupsArr;
    mapping(address user1 => mapping(bytes32 group => bool)) s_isGroupActive;
    mapping(bytes32 groupId => Group) public s_groupIdToGroup;
    mapping(bytes32 groupId => bytes32[] ipfsMsgHash) public s_groupIdToMessages;

    event MessageSent(
        address indexed sender, address indexed recipient, bytes content, bytes32 ipfsMsgHash, uint256 indexed timestamp
    );
    event GroupMessageSent(
        address indexed sender, bytes32 indexed groupId, bytes32 ipfsMsgHash, uint256 indexed timestamp
    );
    event PublicKeyAdded(address indexed user, bytes32 indexed publicKeyHalf1, bytes32 indexed publicKeyHalf2);
    event ChatInitiated(address indexed sender, address indexed recipient);
    event GroupInitiated(address[] indexed participants, bytes32 indexed groupId);

    error Lotus__GroupAlreadyExists();
    error Lotus__AddressesNotSorted();
    error Lotus__GroupNotActiveForUser();

    function sendMessage(address _recipient, bytes32 ipfsMsgHash, bytes calldata encryptedMsg) external {
        s_senderToRecipientMessages[msg.sender][_recipient].push(ipfsMsgHash);
        emit MessageSent(msg.sender, _recipient, encryptedMsg, ipfsMsgHash, block.timestamp);
    }

    function initChat(address _recipient) external {
        if (s_isChatActive[msg.sender][_recipient] == false) {
            s_activeChatsArr[msg.sender].push(_recipient);
            s_activeChatsArr[_recipient].push(msg.sender);
            s_isChatActive[msg.sender][_recipient] = true;
            s_isChatActive[_recipient][msg.sender] = true;
        }

        emit ChatInitiated(msg.sender, _recipient);
    }

    function sendGroupMessage(bytes32 _groupId, bytes32 ipfsMsgHash) external {
        if (s_isGroupActive[msg.sender][_groupId] == false) {
            revert Lotus__GroupNotActiveForUser();
        }
        s_groupIdToMessages[_groupId].push(ipfsMsgHash);
        emit GroupMessageSent(msg.sender, _groupId, ipfsMsgHash, block.timestamp);
    }

    function addPublicKey(bytes32 publicKeyHalf1, bytes32 publicKeyHalf2) external {
        s_addressToPublicKey[msg.sender] = PublicKey({half1: publicKeyHalf1, half2: publicKeyHalf2});
        emit PublicKeyAdded(msg.sender, publicKeyHalf1, publicKeyHalf2);
    }

    function initGroup(address[] calldata _members, string calldata _name) external {
        bytes32 groupId = keccak256(abi.encodePacked(_members));
        if (!isSorted(_members)) {
            revert Lotus__AddressesNotSorted();
        }
        if (s_groupIdToGroup[groupId].id != 0) {
            revert Lotus__GroupAlreadyExists();
        }
        s_groupIdToGroup[groupId] =
            Group({id: groupId, members: _members, name: _name, numOfParticipants: uint32(_members.length)});

        for (uint256 i = 0; i < _members.length; i++) {
            s_activeGroupsArr[_members[i]].push(groupId);
            s_isGroupActive[_members[i]][groupId] = true;
        }

        emit GroupInitiated(_members, groupId);
    }

    function getPublicKey(address _userAddress) external view returns (bytes32, bytes32) {
        PublicKey memory publicKey = s_addressToPublicKey[_userAddress];
        return (publicKey.half1, publicKey.half2);
    }

    function getMessages(address _sender, address _recipient) external view returns (bytes32[] memory) {
        return s_senderToRecipientMessages[_sender][_recipient];
    }

    function getGroup(bytes32 _groupId) external view returns (Group memory) {
        return s_groupIdToGroup[_groupId];
    }

    function isSorted(address[] calldata addresses) public pure returns (bool) {
        for (uint256 i = 0; i < addresses.length - 1; i++) {
            if (addresses[i] > addresses[i + 1]) {
                return false;
            }
        }
        return true;
    }
}
