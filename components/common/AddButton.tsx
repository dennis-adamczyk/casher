import css from '@styled-system/css';
import { Plus } from 'react-feather';
import styled from 'styled-components';
import { margin } from 'styled-system';
import Button from '../ui/Button';

const AddButton = styled(Button).attrs({ bg: 'midnight.500', iconBefore: <Plus />, block: true })(
  css({
    marginTop: 5,
    marginX: 'auto',
    color: 'white.default',
    width: 'fit-content',
  }),
  margin,
);

export default AddButton;
