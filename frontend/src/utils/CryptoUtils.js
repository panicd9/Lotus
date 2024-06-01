import { ethers } from 'ethers';
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
    var selfIdentity = null;
    var wallet = null;
    var contactPublicKeys = {};

    function adddContactPublicKey(contactAddress, publicKey) {
        this.contactPublicKeys[contactAddress] = publicKey;
    }

    function getContactPublicKey(contactAddress) {
        return this.contactPublicKeys[contactAddress];
    }

    function importWallet(privateKey) {
        wallet = new ethers.Wallet(privateKey);;
        selfIdentity = {
            address: wallet.address,
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey
        };
    }

    function createWallet() {
        const identity = EthCrypto.createIdentity();
        selfIdentity = identity;

        wallet = new ethers.Wallet(identity.privateKey);
    }

    async function encryptMessage(message, contactAddress) {
        const contactPublicKey = this.contactPublicKeys[contactAddress];

        const signature = EthCrypto.sign(
            selfIdentity.privateKey,
            EthCrypto.hash.keccak256(message)
        );
        const payload = {
            message: message,
            signature
        };
        const encrypted = await EthCrypto.encryptWithPublicKey(
            contactPublicKey,
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
