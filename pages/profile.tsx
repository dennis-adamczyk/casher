import LoadingScreen from '@/components/common/LoadingScreen';
import ProfilePicture from '@/components/common/ProfilePicture';
import Content from '@/components/layout/Content';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Loading/Spinner';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import css from '@styled-system/css';
import { GetServerSideProps, NextPage } from 'next';
import { LogOut } from 'react-feather';
import styled from 'styled-components';

const ProfileInfoWrapper = styled.div(
  css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  }),
);

const ProfileInfoTextWrapper = styled.div(
  css({
    marginLeft: 4,
  }),
);

const ProfileInfoTextNickname = styled.p(
  css({
    fontSize: 'large',
    fontWeight: 'medium',
  }),
);

const ProfileInfoTextName = styled.p(
  css({
    fontSize: 1,
    color: 'white.opacity.7',
  }),
);

const SettingsTitle = styled.p(
  css({
    fontSize: 1,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    color: 'white.opacity.7',
    textTransform: 'uppercase',
    marginTop: 5,
    marginBottom: 10,
  }),
);

const LogoutButton = styled(Button).attrs({ bg: 'transparent' })(
  css({
    justifyContent: 'flex-start',
    color: 'white.default',
    marginX: -3,
  }),
);

const ProfilePage: NextPage = () => {
  const { isLoading, user } = useUser();

  if (isLoading) return <LoadingScreen />;

  return (
    <Content>
      <ProfileInfoWrapper>
        <ProfilePicture size={10} src={user?.picture || undefined} />
        <ProfileInfoTextWrapper>
          <ProfileInfoTextNickname>{user?.nickname || ''}</ProfileInfoTextNickname>
          <ProfileInfoTextName>{user?.name || ''}</ProfileInfoTextName>
        </ProfileInfoTextWrapper>
      </ProfileInfoWrapper>
      <SettingsTitle>Einstellungen</SettingsTitle>
      <LogoutButton block href="/api/auth/logout" iconBefore={<LogOut />}>
        Abmelden
      </LogoutButton>
    </Content>
  );
};

export default withPageAuthRequired(ProfilePage);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      hideHeader: true,
    },
  };
};
