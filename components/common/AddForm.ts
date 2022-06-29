import { selectOption } from '@/constants/selectOptions';
import css from '@styled-system/css';
import styled from 'styled-components';

export const AddFormWrapper = styled.form(css({}));

export const AddFormTitle = styled.h1(
  css({
    fontSize: 5,
    fontWeight: 'semiBold',
    marginBottom: 5,
  }),
);

export const AddFormButtons = styled.div(
  css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }),
);

export interface AddFormProps {
  title: string;
  accounts: selectOption[];
  categories?: selectOption[];
}
