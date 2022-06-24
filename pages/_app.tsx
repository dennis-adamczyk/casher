import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import GlobalStyle from '../constants/globalStyles';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import theme from '../constants/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
