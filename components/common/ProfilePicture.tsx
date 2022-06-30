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
  }),
);

interface ProfilePictureProps extends ProfilePictureWrapperProps {
  src?: string;
}

const ProfilePicture: FC<ProfilePictureProps> = ({
  size = 8,
  src = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
}) => {
  return (
    <ProfilePictureWrapper size={size}>
      <Image
        src={src}
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
