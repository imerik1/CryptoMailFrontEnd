import CryptoJS from 'crypto-js';

import { IAuth } from './createToken';

const decryptToken = (token: string): IAuth => {
    const bytes  = CryptoJS.AES.decrypt(token, process.env.NEXT_PUBLIC_KEY_CRYPTO!);
    const decryptedData: IAuth = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

export default decryptToken;