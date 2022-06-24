import BottomTabNavigation from '@/components/layout/BottomTabNavigation';
import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Flag, Home, PieChart, RotateCcw } from 'react-feather';
import { ThemeProvider } from 'styled-components';
import Header from '../components/layout/Header';
import GlobalStyle from '../constants/globalStyles';
import theme from '../constants/theme';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
          <meta name="color-scheme" content="dark" />
        </Head>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <BottomTabNavigation
          items={[
            { name: 'Übersicht', href: '/', icon: <Home /> },
            { name: 'Analyse', href: '/analysis', icon: <PieChart /> },
            { name: 'Abos', href: '/subscriptions', icon: <RotateCcw /> },
            { name: 'Sparziele', href: '/goals', icon: <Flag /> },
          ]}
        />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
