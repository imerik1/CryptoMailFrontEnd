import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useCookies } from 'react-cookie';

import Form from '../components/formSignup/Form';
import Header from '../components/header/Header';
import styles from '../styles/signup.module.scss';
import parseCookies from '../utils/parseCookies';

const SignUp: NextPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();
    if (cookies.user) {
        router.push('/dashboard');
    }
    return (
        <>
            <Head>
                <title>Registrar-se</title>
            </Head>
            <Header />
            <main className={styles.main}>
                <Form />
            </main>
            <footer></footer>
        </>
    );
};

SignUp.getInitialProps = async ({ req, res }) => {
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

export default SignUp;
