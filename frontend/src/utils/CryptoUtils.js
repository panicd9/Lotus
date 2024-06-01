import { ethers } from 'ethers';
const EthCrypto = require('eth-crypto');

/**
 * @typedef {Object} Identity
 * @property {string} privateKey
 * @property {string} publicKey
 * @property {string} address
 */

export class CryptoUtils {
    /**
     * @type {Identity}
     */
    static selfIdentity = null;
    static wallet = null;
    static contactPublicKeys = {};

    static setSelfIdentity(identity) {
        this.selfIdentity = identity;
    }

    static addContactPublicKey(contactAddress, publicKey) {
        this.contactPublicKeys[contactAddress] = publicKey;
    }

    static getContactPublicKey(contactAddress) {
        return this.contactPublicKeys[contactAddress];
    }

    static importWallet(privateKey) {
        const wallet = new ethers.Wallet(privateKey);
        this.wallet = wallet;
        this.selfIdentity = {
            address: wallet.address,
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey
        };
    }

    static createWallet() {
        const identity = EthCrypto.createIdentity();
        this.selfIdentity(identity);

        this.wallet = new ethers.Wallet(identity.privateKey);
    }

    static async encryptMessage(message, contactAddress) {
        const contactPublicKey = this.contactPublicKeys[contactAddress];

        const signature = EthCrypto.sign(
            this.selfIdentity.privateKey,
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

    static async decryptMessage(encryptedMessageString) {
        // we parse the string into the object again
        const encryptedMessage = EthCrypto.cipher.parse(encryptedMessageString);

        const decrypted = await EthCrypto.decryptWithPrivateKey(
            this.selfIdentity.privateKey,
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
}