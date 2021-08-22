import CryptoJS from 'crypto-js';

import { IUser } from '../types/Users';

const decryptUser = (token: string) => {
    const bytes  = CryptoJS.AES.decrypt(token, process.env.NEXT_PUBLIC_KEY_CRYPTO!);
    const decryptedData: IUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

export default decryptUser;