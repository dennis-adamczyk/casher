import css from '@styled-system/css';
import { FC } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
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

const AddFormButtons = styled.div(
  css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
      <Select
        label="Konto"
        options={[
          { value: 0, label: 'Sparkasse Duisburg' },
          { value: 1, label: 'Volksbank Niederrhein' },
        ]}
      />
      <Select
        label="Kategorie"
        options={[
          { value: 0, label: 'Streaming' },
          { value: 1, label: 'Fitness' },
        ]}
      />
      <AddFormButtons>
        <Button bg="midnight.500" mr={4}>
          Abbrechen
        </Button>
        <Button bg="primary.500">Speichern</Button>
      </AddFormButtons>
    </AddFormWrapper>
  );
};

export default AddForm;
