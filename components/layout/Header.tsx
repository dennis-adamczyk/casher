import Image from 'next/image';
import { FC } from 'react';
import logo from '@/assets/img/logo.svg';
import styled from 'styled-components';
import css from '@styled-system/css';
import ProfilePicture from '../common/ProfilePicture';
import { rgba } from 'polished';
import Link from 'next/link';

const HeaderWrapper = styled.header(({ theme }) =>
  css({
    position: 'sticky',
    top: 0,
    height: 10,
    backgroundColor: rgba(theme.colors.midnight[800], 0.96),
    zIndex: 10,
  }),
);

const HeaderContent = styled.div(({ theme }) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingX: 4,
    paddingY: 2,
    width: '100%',
    maxWidth: theme.breakpoints.medium,
    marginX: 'auto',
  }),
);

const LogoLink = styled.a(
  css({
    cursor: 'pointer',
  }),
);

const ProfilePictureLink = styled.a(
  css({
    cursor: 'pointer',
  }),
);

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <Link href="/" passHref>
          <LogoLink>
            <Image src={logo} alt="Casher" />
          </LogoLink>
        </Link>

        <Link href="/profile" passHref>
          <ProfilePictureLink>
            <ProfilePicture />
          </ProfilePictureLink>
        </Link>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
