import CryptoJS from 'crypto-js';

const encryptUser = (data: Object) => {
    const tokenCrypto: string = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.KEY_CRYPTO!).toString();
    return tokenCrypto;
}

export default encryptUser;