import Image from 'next/image';
import { FC } from 'react';
import logo from '@/assets/img/logo.svg';
import styled from 'styled-components';
import css from '@styled-system/css';
import ProfilePicture from '../common/ProfilePicture';

const HeaderWrapper = styled.header(
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    paddingX: 4,
    paddingY: 2,
    height: 10,
    backgroundColor: 'midnight.800',
  }),
);

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <HeaderWrapper>
      <Image src={logo} alt="Casher" />
      <ProfilePicture />
    </HeaderWrapper>
  );
};

export default Header;
