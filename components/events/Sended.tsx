/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import date from 'date-and-time';
import moment from 'moment';

import { IUser } from '../../types/Users';
import createHeader from '../../utils/createHeader';
import decryptEmail from '../../utils/decryptEmail';
import divideCrypto from '../../utils/divideCrypto';
import styles from './sended.module.scss';

interface IProps {
    user: IUser;
}

interface Message {
    id: number;
    message: string;
}

interface Email {
    id: number;
    key: string;
    recipient: string;
    sended: boolean;
    sendedAt: string;
    sender: string;
    data: Message;
}

const Sended: React.FC<IProps> = ({ user }: IProps) => {
    const [useEmails, setEmails] = React.useState<Email[] | null>();
    const [useLastUpdate, setLastUpdate] = React.useState<string>(
        date.format(
            new Date(
                new Date().toLocaleString('en-US', {
                    timeZone: 'America/Sao_Paulo',
                })
            ),
            'HH:mm:ss'
        )
    );
    const [useRefresh, setRefresh] = React.useState<boolean>(true);
    const getEmails = () => {
        fetch(`api/email/sended/${user.email}`, {
            headers: createHeader(),
        }).then((responses) => {
            responses.json().then((data) => {
                if (data.data) {
                    setEmails(data.data.reverse());
                }
            });
        });
        setLastUpdate(
            date.format(
                new Date(
                    new Date().toLocaleString('en-US', {
                        timeZone: 'America/Sao_Paulo',
                    })
                ),
                'HH:mm:ss'
            )
        );
        setRefresh(false);
    };
    React.useEffect(() => {
        getEmails();
    }, []);
    const Refresh = (e: any) => {
        e.preventDefault();
        setRefresh(true);
        getEmails();
    };
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h1>E-mails enviados por você</h1>
                <div className={styles.date}>
                    <p>Atualizado às {useLastUpdate}</p>
                    <img
                        src='/assets/refresh.png'
                        height='20'
                        onClick={Refresh}
                    />
                </div>
            </div>
            {useRefresh ? (
                <p>Carregando e-mails...</p>
            ) : useEmails?.length! > 0 ? (
                <>
                    {useEmails?.map((email, index) => {
                        return (
                            <details className={styles.details} key={index}>
                                <summary>
                                    <b>Para:</b> {email.recipient} às{' '}
                                    {moment(email.sendedAt).format(
                                        'DD/MM/yyyy HH:mm:ss'
                                    )}
                                </summary>
                                <div className={styles.info}>
                                    <span>
                                        <b>Mensagem criptografada:</b>
                                        {divideCrypto(email.data.message)}
                                    </span>
                                    <span>
                                        <b>Sua senha</b>
                                        {email.key.replace('-', ' ')}
                                    </span>
                                    <span>
                                        <b>Mensagem descriptografada:</b>{' '}
                                        {decryptEmail(
                                            email.data.message,
                                            email.key
                                        )}
                                    </span>
                                    <p className={styles.sended}>
                                        <b>Enviado:</b>{' '}
                                        {email.sended ? (
                                            <img
                                                src='/assets/correct.png'
                                                height='15'
                                            />
                                        ) : (
                                            <img
                                                src='/assets/incorrect.png'
                                                height='15'
                                            />
                                        )}
                                    </p>
                                </div>
                            </details>
                        );
                    })}
                </>
            ) : (
                <p>Não há nenhum e-mail.</p>
            )}
        </section>
    );
};

export default Sended;
