import { FC } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { AddFormProps, AddFormWrapper, AddFormTitle, AddFormButtons } from './AddForm';
import { getAllSelectOptions } from '@/constants/interval';

const AddSubscriptionForm: FC<AddFormProps> = ({ title, accounts }) => {
  return (
    <AddFormWrapper>
      <AddFormTitle>{title}</AddFormTitle>
      <Input label="Name des Ziels" />
      <Input label="Emoji des Ziels" />
      <Input label="Zielbetrag" suffix="€" type="number" />
      <Input label="Regulärer Betrag" suffix="€" type="number" />
      <Input label="Startbetrag" suffix="€" type="number" />
      <Select label="Intervall" options={getAllSelectOptions()} />
      <Select label="Konto" options={accounts} />
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
