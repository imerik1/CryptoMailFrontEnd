import React from 'react';

import hash from 'hash-it';
import Link from 'next/link';

import createHeader from '../../utils/createHeader';
import Email from './Email';
import styles from './form.module.scss';
import Password from './Password';
import Username from './Username';

export interface Targets {
    username: any;
    password: any;
    confirmPassword: any;
    email: any;
}

interface Data {
    status: string;
    code: number;
    reasons: string[];
}

const Form: React.FC = () => {
    const [useErrors, setErrors] = React.useState<string[]>([]);
    const [useSucess, setSucess] = React.useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors(() => []);
        const formValues: Targets = e.target as unknown as Targets;
        if (formValues.password.value !== formValues.confirmPassword.value) {
            setErrors((useErrors) => [
                ...useErrors,
                'Suas senhas não estão iguais.',
            ]);
        } else {
            const body = {
                username: formValues.username.value,
                password: hash(formValues.password.value),
                email: formValues.email.value,
            };
            const request = await fetch(`api/users/signup`, {
                method: 'POST',
                headers: createHeader(),
                body: JSON.stringify(body),
            });
            const data: Data =
                request.status > 299 ? await request.json() : undefined;
            if (data) setErrors((useErrors) => [...useErrors, ...data.reasons]);
            if (request.status < 299 && request.status > 199) setSucess(true);
        }
    };

    return (
        <>
            <h1>Registrar-se</h1>
            {useSucess ? (
                <>
                    <h2 className={styles.success}>
                        Usuário cadastrado com sucesso.
                    </h2>
                </>
            ) : (
                <></>
            )}
            <form className={styles.form} onSubmit={handleSubmit}>
                <Username />
                <Password />
                <Email />
                <input type='submit' value='Registrar' />
            </form>

            {React.useMemo(() => {
                if (useErrors.length !== 0)
                    return (
                        <ul className={styles.error}>
                            {useErrors.map((error: string, index: number) => {
                                return <li key={index}>{error}</li>;
                            })}
                        </ul>
                    );
            }, [useErrors])}
            {useSucess ? (
                <>
                    <Link passHref={true} href='/'>
                        Voltar para o ínicio
                    </Link>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default Form;
