import CryptoJS from 'crypto-js';

const createEmail = (message: string, key: string) => {
    const messageEncryptedFirstLayer = CryptoJS.AES.encrypt(message, key).toString();
    const messageEncrypted = CryptoJS.AES.encrypt(messageEncryptedFirstLayer, process.env.KEY_CRYPTO!).toString();
    return messageEncrypted;
}

export default createEmail;