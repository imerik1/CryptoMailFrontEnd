import CryptoJS from 'crypto-js';

const decryptEmail = (message: string, key: string) => {
    const messageFirstLayer  = CryptoJS.AES.decrypt(message, process.env.NEXT_PUBLIC_KEY_CRYPTO!).toString(CryptoJS.enc.Utf8);
    const messageOriginal  = CryptoJS.AES.decrypt(messageFirstLayer, key).toString(CryptoJS.enc.Utf8);
    return messageOriginal;
}

export default decryptEmail;