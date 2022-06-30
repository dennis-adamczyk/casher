import css from '@styled-system/css';
import React from 'react';
import styled from 'styled-components';
import Content from '../layout/Content';
import Spinner from '../ui/Loading/Spinner';

const CenteredContent = styled(Content)(
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
);

const LoadingScreen = () => {
  return (
    <CenteredContent>
      <Spinner />
    </CenteredContent>
  );
};

export default LoadingScreen;
