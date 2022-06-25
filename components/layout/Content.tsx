import css from '@styled-system/css';
import styled from 'styled-components';

interface ContentProps {}

const Content = styled.div<ContentProps>(
  css({
    marginTop: 5,
    paddingBottom: 12,
    paddingX: 4,
    flexGrow: 1,
  }),
);

export default Content;
