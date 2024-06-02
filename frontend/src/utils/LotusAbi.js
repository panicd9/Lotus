export const lotusAbi = [
    {
        "type": "function",
        "name": "addPublicKey",
        "inputs": [
            {
                "name": "publicKeyHalf1",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "publicKeyHalf2",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getGroup",
        "inputs": [
            {
                "name": "_groupId",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Lotus.Group",
                "components": [
                    {
                        "name": "id",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    {
                        "name": "members",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "numOfParticipants",
                        "type": "uint32",
                        "internalType": "uint32"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMessages",
        "inputs": [
            {
                "name": "_sender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_recipient",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]",
                "internalType": "bytes32[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPublicKey",
        "inputs": [
            {
                "name": "_userAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initChat",
        "inputs": [
            {
                "name": "_recipient",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "initGroup",
        "inputs": [
            {
                "name": "_members",
                "type": "address[]",
                "internalType": "address[]"
            },
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "isSorted",
        "inputs": [
            {
                "name": "addresses",
                "type": "address[]",
                "internalType": "address[]"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "s_addressToPublicKey",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "half1",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "half2",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "s_groupIdToGroup",
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "numOfParticipants",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "s_groupIdToMessages",
        "inputs": [
            {
                "name": "groupId",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "ipfsMsgHash",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "s_senderToRecipientMessages",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "recipient",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "ipfsMsgHash",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "sendGroupMessage",
        "inputs": [
            {
                "name": "_groupId",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "ipfsMsgHash",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "sendMessage",
        "inputs": [
            {
                "name": "_recipient",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "ipfsMsgHash",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "encryptedMsg",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "ChatInitiated",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "recipient",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "GroupInitiated",
        "inputs": [
            {
                "name": "participants",
                "type": "address[]",
                "indexed": true,
                "internalType": "address[]"
            },
            {
                "name": "groupId",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "GroupMessageSent",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "groupId",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "ipfsMsgHash",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MessageSent",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "recipient",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "content",
                "type": "bytes",
                "indexed": false,
                "internalType": "bytes"
            },
            {
                "name": "ipfsMsgHash",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PublicKeyAdded",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "publicKeyHalf1",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "publicKeyHalf2",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "Lotus__AddressesNotSorted",
        "inputs": []
    },
    {
        "type": "error",
        "name": "Lotus__GroupAlreadyExists",
        "inputs": []
    },
    {
        "type": "error",
        "name": "Lotus__GroupNotActiveForUser",
        "inputs": []
    }
]