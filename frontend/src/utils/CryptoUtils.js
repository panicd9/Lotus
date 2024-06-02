import { SigningKey, ethers, getDefaultProvider } from 'ethers';
import { lotusAbi } from './LotusAbi.js';
import { create } from 'ipfs-http-client';
const bs58 = require('bs58');

const EthCrypto = require('eth-crypto');

/**
 * @typedef {Object} Identity
 * @property {string} privateKey
 * @property {string} publicKey
 * @property {string} address
 */

    /**
     * @type {Identity}
     */
    let selfIdentity = null;
    let wallet = null;
    let contactPublicKeys = {};
    export let contract = null;
    const ipfs = create('http://localhost:5001/api/v0');

    const contractAddresses = {
        anvil: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    }

    async function addMessageToIpfs(message) {
        const { path } = await ipfs.add(message);
        return path;
    }

    export function importWallet(privateKey) {
        let provider = getDefaultProvider("http://localhost:8545/");


        wallet = new ethers.Wallet(privateKey, provider);
        selfIdentity = {
            address: wallet.address,
            privateKey: wallet.privateKey,
            publicKey: SigningKey.computePublicKey(wallet.privateKey)
        };

        contract = new ethers.Contract(contractAddresses.anvil, lotusAbi, wallet);
    }

    export function createWallet() {
        const identity = EthCrypto.createIdentity();
        selfIdentity = identity;
        console.log("selfIdentity: ", selfIdentity)

        let provider = getDefaultProvider("http://localhost:8545/");
        wallet = new ethers.Wallet(identity.privateKey, provider);

        contract = new ethers.Contract(contractAddresses.anvil, lotusAbi, wallet);
    }

    async function encryptMessage(message, contactAddress) {
        const contactPublicKeyHalfs = await getPublicKey("0xa0Ee7A142d267C1f36714E4a8F75612F20a79720")

        const contactPublicKeyString = contactPublicKeyHalfs[0].substring(2) + contactPublicKeyHalfs[1].substring(2);
        console.log("contactPublicKeyString: ", contactPublicKeyString)

        // const contactPublicKey = Buffer.from(contactPublicKeyString, 'hex');
        
        // console.log("contactPublicKey: ", contactPublicKey)

        const signature = EthCrypto.sign(
            selfIdentity.privateKey,
            EthCrypto.hash.keccak256(message)
        );
        const payload = {
            message: message,
            signature
        };
        const encrypted = await EthCrypto.encryptWithPublicKey(
            contactPublicKeyString,
            JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
        );
        /*  { iv: 'c66fbc24cc7ef520a7...',
          ephemPublicKey: '048e34ce5cca0b69d4e1f5...',
          ciphertext: '27b91fe986e3ab030...',
          mac: 'dd7b78c16e462c42876745c7...'
            }
        */

        // we convert the object into a smaller string-representation
        const encryptedMessageString = EthCrypto.cipher.stringify(encrypted);
        // > '812ee676cf06ba72316862fd3dabe7e403c7395bda62243b7b0eea5eb..'

        return encryptedMessageString;
    }

    async function decryptMessage(encryptedMessageString) {
        // we parse the string into the object again
        const encryptedMessage = EthCrypto.cipher.parse(encryptedMessageString);

        const decrypted = await EthCrypto.decryptWithPrivateKey(
            selfIdentity.privateKey,
            encryptedMessage
        );
        const decryptedPayload = JSON.parse(decrypted);

        // check signature
        const senderAddress = EthCrypto.recover(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(decryptedPayload.message)
        );

        console.log(
            'Got message from ' +
            senderAddress +
            ': ' +
            decryptedPayload.message
        );
        // > 'Got message from 0x19C24B2d99FB91C5...: "My name is Satoshi Buterin" Buterin'
    }

    export async function addPublicKey() {
        // Convert the public key to a Buffer
        console.log("selfIdentity", selfIdentity)

        // TODO: FIX THIS, ITS OK IF WE IMPORT WALLET, BUT WHEN WE CREATE WALLET WE NEED TO HANDLE DIFFERENTLY
        const publicKeyBuffer = Buffer.from(selfIdentity.publicKey.substring(4), 'hex');

        console.log("publicKeyBuffer", publicKeyBuffer)
        // Calculate the midpoint
        const midpoint = 32
        // Split the public key into two halves
        // const publicKeyHalf1 = publicKeyBuffer.subarray(0, midpoint).toString('hex');
        // const publicKeyHalf2 = publicKeyBuffer.subarray(midpoint).toString('hex');

        const publicKeyHalf1 = publicKeyBuffer.subarray(0, midpoint);
        const publicKeyHalf2 = publicKeyBuffer.subarray(midpoint);

        console.log("publicKeyHalf1", publicKeyHalf1)
        console.log("publicKeyHalf2", publicKeyHalf2)

        const tx = await contract.addPublicKey(publicKeyHalf1, publicKeyHalf2);
        return tx.wait();
    }
    
    export async function getGroup(groupId) {
        return await contract.getGroup(groupId);
    }
    
    export async function getMessages(sender, recipient) {
        return await contract.getMessages(sender, recipient);
    }
    
    export async function sendGroupMessage(groupId, ipfsMsgHash) {
        const tx = await contract.sendGroupMessage(groupId, ipfsMsgHash);
        return tx.wait();
    }
    
    export async function sendMessage(plainMessage, recipient) {
        const encryptedMsg = await encryptMessage(plainMessage, recipient);
        console.log("encryptedMsg: ", encryptedMsg);
        const CID = await addMessageToIpfs(encryptedMsg);
        console.log("CID: ", CID)
        const base58CID = bs58.decode(CID);

        // 18 32 prva dva bajta koja sklanjamo
        const removedFirst2Bytes = base58CID.slice(2);
        console.log("base58CID: ", base58CID)
        console.log("recipient: ", recipient)   
        const tx = await contract.sendMessage(recipient, removedFirst2Bytes, ethers.toUtf8Bytes(encryptedMsg));
        return tx.wait();
    }
    
    export async function getPublicKey(userAddress) {
        return await contract.getPublicKey(userAddress);
    }
    
    export async function initChat(recipient) {
        const tx = await contract.initChat(recipient);
        return tx.wait();
    }
    
    export async function initGroup(members, name) {
        const tx = await contract.initGroup(members, name);
        return tx.wait();
    }
    
    export async function isSorted(addresses) {
        return await contract.isSorted(addresses);
    }
