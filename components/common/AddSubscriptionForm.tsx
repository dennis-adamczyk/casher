import { FC } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { AddFormProps, AddFormWrapper, AddFormTitle, AddFormButtons } from './AddForm';
import { getAllSelectOptions } from '@/helpers/interval';

const AddSubscriptionForm: FC<AddFormProps> = ({ title, accounts, categories }) => {
  return (
    <AddFormWrapper>
      <AddFormTitle>{title}</AddFormTitle>
      <Input label="Name des Abos" />
      <Input label="Betrag" suffix="€" type="number" />
      <Select label="Intervall" options={getAllSelectOptions()} />
      <Select label="Konto" options={accounts} />
      <Select label="Kategorie" options={categories} />
      <AddFormButtons>
        <Button bg="midnight.500" mr={4}>
          Abbrechen
        </Button>
        <Button bg="primary.500">Speichern</Button>
      </AddFormButtons>
    </AddFormWrapper>
  );
};

export default AddSubscriptionForm;
