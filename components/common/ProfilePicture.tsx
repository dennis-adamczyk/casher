import { useUser } from '@auth0/nextjs-auth0';
import css from '@styled-system/css';
import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';

interface ProfilePictureWrapperProps {
  size?: number;
}

const ProfilePictureWrapper = styled.div<ProfilePictureWrapperProps>(({ size = 8 }) =>
  css({
    width: size,
    height: size,
    position: 'relative',
    borderRadius: 'round',
    overflow: 'hidden',
    borderWidth: 'normal',
    borderStyle: 'normal',
    borderColor: 'white.opacity.7',
    backgroundColor: 'midnight.500',
  }),
);

interface ProfilePictureProps extends ProfilePictureWrapperProps {
  src?: string;
}

const ProfilePicture: FC<ProfilePictureProps> = ({ size = 8 }) => {
  const { isLoading, user } = useUser();

  if (isLoading || !user?.picture) return <ProfilePictureWrapper size={size}></ProfilePictureWrapper>;

  return (
    <ProfilePictureWrapper size={size}>
      <Image src={user?.picture} alt="Dein Profil" layout="fill" objectFit="cover" unoptimized />
    </ProfilePictureWrapper>
  );
};

export default ProfilePicture;
