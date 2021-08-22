import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

import Form from '../components/formSignin/Form';
import Header from '../components/header/Header';
import styles from '../styles/signin.module.scss';
import parseCookies from '../utils/pasrseCookies';

const Home: NextPage = ({ data }: any) => {
    const router = useRouter();
    if (data.user) {
        router.push('/dashboard');
    }
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Form />
            </main>
        </>
    );
};

Home.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req);

    if (res) {
        if (data.user) {
            res?.writeHead(301, { Location: '/dashboard' }).end();
        }
    }

    return {
        data: data && data,
    };
};

export default Home;
