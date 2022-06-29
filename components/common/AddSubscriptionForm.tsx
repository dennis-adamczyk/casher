import { FC } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { AddFormProps, AddFormWrapper, AddFormTitle, AddFormButtons } from './AddForm';
import { getAllSelectOptions } from '@/helpers/interval';
import { useRouter } from 'next/router';

const AddSubscriptionForm: FC<AddFormProps> = ({ title, accounts, categories }) => {
  const { back } = useRouter();

  console.log('Subform');

  return (
    <AddFormWrapper>
      <AddFormTitle>{title}</AddFormTitle>
      <Input label="Name des Abos" />
      <Input label="Betrag" suffix="€" step="0.01" type="number" />
      <Select label="Intervall" options={getAllSelectOptions()} />
      <Select label="Konto" options={accounts} />
      <Select label="Kategorie" options={categories} />
      <AddFormButtons>
        <Button bg="midnight.500" type="button" onClick={() => back()} mr={4}>
          Abbrechen
        </Button>
        <Button bg="primary.500" type="submit">
          Speichern
        </Button>
      </AddFormButtons>
    </AddFormWrapper>
  );
};

export default AddSubscriptionForm;
