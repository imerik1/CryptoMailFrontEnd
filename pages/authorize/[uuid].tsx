import {
    NextPage,
    NextPageContext,
} from 'next';
import { useRouter } from 'next/dist/client/router';

import createHeader from '../../utils/createHeader';

const Authorize: NextPage = () => {
    const router = useRouter();
    router.push('/');
    return <div>Cadastrado.</div>;
};

Authorize.getInitialProps = async ({
    req,
    res,
    query: { uuid },
}: NextPageContext) => {
    await fetch(`${process.env.API_URL}/1.0/users/authorize/${uuid}`, {
        headers: createHeader(),
    });
    if (res) {
        res?.writeHead(301, { Location: '/' }).end();
    }
};

export default Authorize;
