import React from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

import Create from '../components/events/Create';
import Received from '../components/events/Received';
import Sended from '../components/events/Sended';
import Header from '../components/header/Header';
import Logout from '../components/Logout';
import styles from '../styles/dashboard.module.scss';
import { IUser } from '../types/Users';
import decryptUser from '../utils/decryptUser';
import parseCookies from '../utils/parseCookies';

const Dashboard: NextPage = ({ data }: any) => {
    const [useUser, setUser] = React.useState<IUser>(decryptUser(data.user));
    const [useMode, setMode] = React.useState('sended');
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Dashboard | {useUser.username}</title>
            </Head>
            <Header nav={<Logout />} email={useUser.email} />
            <main className={styles.main}>
                <aside className={styles.aside}>
                    <section className={styles.grade}>
                        <button
                            className={styles.createButton}
                            onClick={() => setMode('create')}
                        >
                            Criar e-mail
                        </button>
                    </section>
                    <button
                        className={styles.othersButton}
                        onClick={() => setMode('sended')}
                    >
                        E-mails enviados
                    </button>
                    <button
                        className={styles.othersButton}
                        onClick={() => setMode('received')}
                    >
                        E-mails recebidos
                    </button>
                </aside>
                <section>
                    {React.useMemo(() => {
                        return useMode === 'create' ? (
                            <Create user={useUser} />
                        ) : useMode === 'sended' ? (
                            <Sended user={useUser} />
                        ) : (
                            <Received user={useUser} />
                        );
                    }, [useMode])}
                </section>
            </main>
        </>
    );
};

Dashboard.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req);

    if (res) {
        if (!data.user) {
            res!.writeHead(301, { Location: '/' });
            res!.end();
        }
    }

    return {
        data: data && data,
    };
};

export default Dashboard;
