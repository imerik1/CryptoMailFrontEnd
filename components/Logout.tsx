import React from 'react';

import Link from 'next/link';
import { useCookies } from 'react-cookie';

const Logout: React.FC = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const Logout = () => {
        removeCookie('user');
    };
    return (
        <Link passHref href='/'>
            <a onClick={Logout}>Sair</a>
        </Link>
    );
};

export default Logout;
