import css from '@styled-system/css';
import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';

const ProfilePictureWrapper = styled.div(
  css({
    width: 8,
    height: 8,
    position: 'relative',
    borderRadius: 'round',
    overflow: 'hidden',
    borderWidth: 'normal',
    borderStyle: 'normal',
    borderColor: 'white.opacity.7',
  }),
);

interface ProfilePictureProps {}

const ProfilePicture: FC<ProfilePictureProps> = () => {
  return (
    <ProfilePictureWrapper>
      <Image
        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
        alt="Dein Profil"
        // width={48}
        // height={48}
        layout="fill"
        objectFit="cover"
      />
    </ProfilePictureWrapper>
  );
};

export default ProfilePicture;
