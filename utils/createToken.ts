import CryptoJS from 'crypto-js';
import date from 'date-and-time';

export interface IAuth {
    expire: string,
    key: string | undefined
}

const createToken = () => {
    const token: IAuth = {
        expire: date.format(date.addSeconds(new Date(), parseInt(process.env.SECONDS_AUTH!)), 'YYYY-MM-DD HH:mm:ss'),
        key: process.env.KEY_AUTH
    }
    const tokenCrypto: string = CryptoJS.AES.encrypt(JSON.stringify(token), process.env.KEY_CRYPTO!).toString();
    return tokenCrypto;
}

export default createToken;