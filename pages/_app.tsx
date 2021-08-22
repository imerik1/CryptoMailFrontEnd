import '../styles/global.scss';

import React from 'react';

import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
    const [useTheme, setTheme] = React.useState<string>('dark');
    React.useEffect(() => {
        const prefersColorScheme = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        if (localStorage?.getItem('@AppTheme')) {
            setTheme(localStorage.getItem('@AppTheme')!);
        } else if (prefersColorScheme.matches) {
            localStorage.setItem('@AppTheme', 'dark');
        } else {
            localStorage.setItem('@AppTheme', 'light');
        }
    }, []);
    return (
        <CookiesProvider>
            <div className={`${useTheme} AppTheme`}>
                <Component {...pageProps} />
            </div>
        </CookiesProvider>
    );
}
export default MyApp;
