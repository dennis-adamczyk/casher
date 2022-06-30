import BottomTabNavigation from '@/components/layout/BottomTabNavigation';
import Layout from '@/components/layout/Layout';
import { UserProvider, withPageAuthRequired } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Flag, Home, PieChart, RotateCcw } from 'react-feather';
import { ThemeProvider } from 'styled-components';
import Header from '../components/layout/Header';
import GlobalStyle from '../constants/globalStyles';
import theme from '../constants/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Casher</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
          <meta name="color-scheme" content="dark" />
        </Head>
        <GlobalStyle />
        <Layout hideHeader={pageProps?.hideHeader}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
