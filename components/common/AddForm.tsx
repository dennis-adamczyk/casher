import css from '@styled-system/css';
import { FC } from 'react';
import styled from 'styled-components';
import Input from '../ui/Input';
import Select from '../ui/Select';

const AddFormWrapper = styled.form(css({}));

const AddFormTitle = styled.h1(
  css({
    fontSize: 5,
    fontWeight: 'semiBold',
    marginBottom: 5,
  }),
);

interface AddFormProps {
  title: string;
}

const AddForm: FC<AddFormProps> = ({ title }) => {
  return (
    <AddFormWrapper>
      <AddFormTitle>{title}</AddFormTitle>
      <Input label="Name des Abos" />
      <Input label="Betrag" suffix="€" type="number" />
      <Select
        label="Intervall"
        options={[
          { value: 0, label: 'monatlich' },
          { value: 1, label: 'jährlich' },
        ]}
      />
    </AddFormWrapper>
  );
};

export default AddForm;
