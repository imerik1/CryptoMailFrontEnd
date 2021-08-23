import date from 'date-and-time';
import moment from 'moment';
import type {
    NextApiRequest,
    NextApiResponse,
} from 'next';

import { IAuth } from '../../../utils/createToken';
import decryptToken from '../../../utils/decryptToken';

const createEmail = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    const token = req.headers.authorization as string;
    const { expire, key }: IAuth = decryptToken(token);
    const now = date.format(
        new Date(
            new Date().toLocaleString('en-US', {
                timeZone: 'America/Sao_Paulo',
            })
        ),
        'YYYY-MM-DD HH:mm:ss'
    );
    if (key !== process.env.KEY_AUTH?.toString())
        return res.status(401).json(
            JSON.stringify({
                status: 'UNAUTHORIZED',
                code: 401,
                reason: 'O token não é válido.',
            })
        );
    if (moment(now).isAfter(expire))
        return res.status(401).json(
            JSON.stringify({
                status: 'UNAUTHORIZED',
                code: 401,
                reason: 'O token está expirado.',
            })
        );
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    header.set('Accept', 'application/json');
    const postUser = await fetch(`${process.env.API_URL}/1.0/emails`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body),
    });
    if (postUser.status !== 204)
        return res
            .status(postUser.status)
            .json(JSON.stringify(await postUser.json()));
    if (postUser.status === 204) return res.status(postUser.status).end();
};

export default createEmail;
