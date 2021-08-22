import { NextPage } from 'next';

import Form from '../components/formSignup/Form';
import Header from '../components/header/Header';
import styles from '../styles/signup.module.scss';

const SignUp: NextPage = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Form />
            </main>
            <footer></footer>
        </>
    );
};

export default SignUp;
