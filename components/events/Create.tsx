import React from 'react';

import uuid from 'uuid-random';

import { IUser } from '../../types/Users';
import createEmail from '../../utils/createEmail';
import createHeader from '../../utils/createHeader';
import styles from './create.module.scss';

interface IProps {
    user: IUser;
}

const Create: React.FC<IProps> = ({ user }: IProps) => {
    const [useSuccess, setSuccess] = React.useState<boolean>(false);
    const [useError, setError] = React.useState<boolean>(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        const formValues = e.target;
        const key = uuid();
        const message = createEmail(formValues.message.value, key);
        const body = {
            key: key,
            sender: user.email,
            recipient: formValues.recipient.value,
            data: {
                message: message,
            },
        };
        const fetchEmail = await fetch('api/email/create', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: createHeader(),
        });
        if (fetchEmail.status === 204) {
            setSuccess(true);
        }
        if (fetchEmail.status !== 204) setError(true);
        e.target.reset();
        setInterval(() => {
            setSuccess(false);
            setError(false);
        }, 5000);
    };
    return (
        <>
            <h2>Olá, {user.username}</h2>
            <p>
                O processo de criação de uma mensagem criptografada é bem
                simples, basta você digitar o e-mail do destinatário e em
                seguida digitar a mensagem e clique em enviar, ela ficará
                criptografada e a única pessoa que terá acesso é o destinatário.
            </p>
            {useError ? (
                <p className={styles.error}>Mensagem não foi enviada.</p>
            ) : (
                <></>
            )}
            {useSuccess ? (
                <p className={styles.success}>Mensagem enviada com sucesso.</p>
            ) : (
                <></>
            )}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type='email'
                    id='recipient'
                    placeholder='Digite o e-mail do destinatário'
                    required
                />
                <textarea
                    id='message'
                    cols={30}
                    rows={10}
                    maxLength={1000}
                    placeholder='Digite sua mensagem.'
                    required
                />
                <input type='submit' id='create' value='Enviar' />
            </form>
        </>
    );
};

export default Create;
