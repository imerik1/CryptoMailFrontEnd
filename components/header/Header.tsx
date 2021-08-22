import React from 'react';

import Link from 'next/link';

import styles from './header.module.scss';

const Header: React.FC<any> = ({ nav, email }: any) => {
    const handleChangeTheme = (e: any) => {
        if (localStorage?.getItem('@AppTheme')) {
            document
                .querySelector('.AppTheme')
                ?.classList.remove(localStorage?.getItem('@AppTheme')!);
            localStorage.setItem(
                '@AppTheme',
                localStorage?.getItem('@AppTheme') === 'dark' ? 'light' : 'dark'
            );
            document
                .querySelector('.AppTheme')
                ?.classList.add(localStorage?.getItem('@AppTheme')!);
        }
    };
    return (
        <header className={styles.header}>
            <Link passHref={true} href='/'>
                <img
                    src='https://webtus.net/wp-content/uploads/2015/09/emailmarketing.png'
                    height='35px'
                    alt='Logo do Site CryptoMail'
                />
            </Link>
            <p>
                <strong>{email}</strong>
            </p>
            <nav className={styles.navbar}>
                {nav}
                <label className={styles.switch}>
                    <input onClick={handleChangeTheme} type='checkbox' />
                    <div
                        className={
                            styles.slider + ' ' + styles.round + ' round'
                        }
                    ></div>
                </label>
            </nav>
        </header>
    );
};

export default Header;
