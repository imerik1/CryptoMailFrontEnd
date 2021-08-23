import { NextPage } from 'next';
import Head from 'next/head';

import Form from '../components/formSignup/Form';
import Header from '../components/header/Header';
import styles from '../styles/signup.module.scss';
import parseCookies from '../utils/pasrseCookies';

const SignUp: NextPage = () => {
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
};

export default SignUp;
