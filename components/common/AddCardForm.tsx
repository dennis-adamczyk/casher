import { ChangeEventHandler, FC, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { AddFormProps, AddFormWrapper, AddFormTitle, AddFormButtons } from './AddForm';
import { useRouter } from 'next/router';
import { Bank_Account } from '@prisma/client';
import { GetBankNameSelectionOptions } from './BankCard';
import Select from '../ui/Select';

const AddCardForm: FC<AddFormProps> = ({ title }) => {
  const { back } = useRouter();
  const [formData, setFormData] = useState<Partial<Bank_Account>>({
    user_id: "0",
  });

  const options = GetBankNameSelectionOptions();
  const changeFormData = (field: keyof Bank_Account, asFloat: boolean = false) =>
    ((event) =>
      setFormData((formData) => ({
        ...formData,
        [field]: asFloat ? parseFloat(event.target.value) : event.target.value,
      }))) as ChangeEventHandler<HTMLInputElement>;

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(formData);
    const result = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/api/cards', {
       method: 'POST',
       body: JSON.stringify(formData),
    });

    const content = await result.json();
    console.log(content);
  };

  return (
    <AddFormWrapper onSubmit={onSubmit}>
      <AddFormTitle>{title}</AddFormTitle>
      <Input onChange={changeFormData('bank_name')} value={formData.bank_name} label="Name der Bank" />
      <Input onChange={changeFormData('iban')} value={formData.iban} label="IBAN des Kontos" />
      <Input onChange={changeFormData('holder')} value={formData.holder} label="Name des Kontoinhabers" />
      <Input
        onChange={changeFormData('balance', true)}
        value={formData.balance}
        label="Kontostand"
        suffix="€"
        step="0.01"
        type="number"
      />
      <Select
        onChange={(newValue: any) =>
          setFormData((formData) => ({
            ...formData,
            bank: newValue.value,
          }))
        }
        label="Bank"
        options={options}
      />
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

export default AddCardForm;
