import { NextPage } from 'next';
import Head from 'next/head';

import Form from '../components/formSignup/Form';
import Header from '../components/header/Header';
import styles from '../styles/signup.module.scss';

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

export default SignUp;
