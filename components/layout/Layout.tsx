import { useUser } from '@auth0/nextjs-auth0';
import { FC, ReactNode } from 'react';
import { Flag, Home, PieChart, RotateCcw } from 'react-feather';
import LoadingScreen from '../common/LoadingScreen';
import BottomTabNavigation from './BottomTabNavigation';
import Header from './Header';

interface LayoutProps {
  hideHeader?: boolean;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children, hideHeader }) => {
  const { isLoading } = useUser();

  return (
    <>
      {!hideHeader && <Header />}
      {isLoading ? <LoadingScreen /> : children}
      <BottomTabNavigation
        items={[
          { name: 'Übersicht', href: '/', icon: <Home /> },
          { name: 'Analyse', href: '/analysis', icon: <PieChart /> },
          { name: 'Abos', href: '/subscriptions', icon: <RotateCcw /> },
          { name: 'Sparziele', href: '/goals', icon: <Flag /> },
        ]}
      />
    </>
  );
};

export default Layout;
