import React from 'react';

import hash from 'hash-it';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

import createHeader from '../../utils/createHeader';
import encryptUser from '../../utils/encryptUser';
import styles from './form.module.scss';

const Form: React.FC = () => {
    const [useError, setError] = React.useState<boolean>(false);
    const [useAuthorize, setAuthorize] = React.useState<boolean>(false);
    const [useCookie, setCookie] = useCookies(['user']);
    const router = useRouter();
    const saveUser = (data: Object) => {
        setCookie('user', encryptUser(data), {
            path: '/',
            maxAge: 18000,
            sameSite: true,
        });
        router.push('/dashboard');
    };
    const handleSubmit = async (e: any) => {
        setError(false);
        setAuthorize(false);
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const body = {
            password: hash(password).toString(),
        };
        fetch(`api/users/${username}`, {
            method: 'POST',
            headers: createHeader(),
            body: JSON.stringify(body),
        }).then((response) => {
            response.json().then(async (data) => {
                if (response.status === 200) {
                    if (data?.data?.authorize) {
                        saveUser(data.data);
                    } else {
                        setAuthorize(true);
                    }
                } else {
                    setError(true);
                }
            });
        });
    };
    return (
        <>
            <h1>Fazer login</h1>
            {useError ? <p>Usuário ou senha incorreta.</p> : <></>}
            {useAuthorize ? <p>Você ainda não confirmou seu e-mail.</p> : <></>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    id='username'
                    type='text'
                    placeholder='Digite seu nome de usuário'
                    required
                    onInput={() => setError(false)}
                />
                <input
                    id='password'
                    type='password'
                    placeholder='Digite sua senha'
                    required
                    onInput={() => setError(false)}
                />
                <input type='submit' value='Fazer login' />
            </form>
            <Link passHref={true} href='/signup'>
                Novo? Clique aqui para registrar-se.
            </Link>
        </>
    );
};

export default Form;
