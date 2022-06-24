import css from '@styled-system/css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { rgba } from 'polished';
import { FC, ReactElement } from 'react';
import styled from 'styled-components';

interface BottomTabNavigationItemProps {
  active?: boolean;
}

const BottomTabNavigationItem = styled.a<BottomTabNavigationItemProps>(({ active }) =>
  css({
    flexBasis: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: active ? 1 : 0.5,
  }),
);

const BottomTabNavigationWrapper = styled.nav(({ theme }) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: 11,
    backgroundColor: rgba(theme.colors.midnight[800], 0.96),
    color: 'white.default',
    zIndex: 10,
  }),
);

interface BottomTabNavigationProps {
  items: {
    href: string;
    name: string;
    icon: ReactElement;
  }[];
}

const BottomTabNavigation: FC<BottomTabNavigationProps> = ({ items }) => {
  const { pathname } = useRouter();

  return (
    <BottomTabNavigationWrapper>
      {items?.map((item) => (
        <Link href={item.href} key={item.name}>
          <BottomTabNavigationItem title={item.name} active={item.href === pathname}>
            {item.icon}
          </BottomTabNavigationItem>
        </Link>
      ))}
    </BottomTabNavigationWrapper>
  );
};

export default BottomTabNavigation;
