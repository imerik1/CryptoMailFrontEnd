import CryptoJS from 'crypto-js';
import date from 'date-and-time';

export interface IAuth {
    expire: string,
    key: string | undefined
}

const createToken = () => {
    const token: IAuth = {
        expire: date.format(date.addSeconds(new Date(), parseInt(process.env.NEXT_PUBLIC_SECONDS_AUTH!)), 'YYYY-MM-DD HH:mm:ss'),
        key: process.env.NEXT_PUBLIC_KEY_AUTH
    }
    const tokenCrypto: string = CryptoJS.AES.encrypt(JSON.stringify(token), process.env.NEXT_PUBLIC_KEY_CRYPTO!).toString();
    return tokenCrypto;
}

export default createToken;