// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {console} from "forge-std/console.sol";

contract Lotus {
    struct PublicKey {
        bytes32 half1;
        bytes32 half2;
    }

    mapping(address user => PublicKey) public s_addressToPublicKey;
    mapping(address sender => mapping(address recipient => bytes[] messages)) public s_senderToRecipientMessages;

    event MessageSent(address indexed sender, address indexed recipient, bytes content, uint256 indexed timestamp);
    event PublicKeyAdded(address indexed user, bytes32 indexed publicKeyHalf1, bytes32 indexed publicKeyHalf2);

    function sendMessage(address _recipient, bytes memory message) external {
        s_senderToRecipientMessages[msg.sender][_recipient].push(message);
        emit MessageSent(msg.sender, _recipient, message, block.timestamp);
    }

    function addPublicKey(bytes32 publicKeyHalf1, bytes32 publicKeyHalf2) external {
        s_addressToPublicKey[msg.sender] = PublicKey({half1: publicKeyHalf1, half2: publicKeyHalf2});
        emit PublicKeyAdded(msg.sender, publicKeyHalf1, publicKeyHalf2);
    }

    function getPublicKey(address _userAddress) external view returns (bytes32, bytes32) {
        PublicKey memory publicKey = s_addressToPublicKey[_userAddress];
        return (publicKey.half1, publicKey.half2);
    }

    function getMessages(address _sender, address _recipient) external view returns (bytes[] memory) {
        return s_senderToRecipientMessages[_sender][_recipient];
    }
}
