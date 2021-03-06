import { ChangeEventHandler, FC, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { AddFormProps, AddFormWrapper, AddFormTitle, AddFormButtons } from './AddForm';
import { getAllSelectOptions } from '@/helpers/interval';
import { useRouter } from 'next/router';
import { Goal } from '@prisma/client';

const AddSubscriptionForm: FC<AddFormProps> = ({ title, accounts }) => {
  const { back, push } = useRouter();
  const intervalOptions = getAllSelectOptions();
  const [formData, setFormData] = useState<Partial<Goal>>({
    amount: 0,
    emojiIcon: '',
    name: '',
    savings_amount: 0,
    savings_interval: 3,
    target_amount: 0,
  });

  const changeFormData = (field: keyof Goal, isInt?: boolean) =>
    ((event) =>
      setFormData((formData) => ({
        ...formData,
        [field]: isInt ? parseFloat(event.target.value) : event.target.value,
      }))) as ChangeEventHandler<HTMLInputElement>;

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(formData);
    const result = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/api/goals', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const { success } = await result.json();

    if (success) {
      push('/goals');
    } else {
      alert('Upsi! Da ist etwas schief gelaufen...');
    }
  };

  return (
    <AddFormWrapper onSubmit={onSubmit}>
      <AddFormTitle>{title}</AddFormTitle>
      <Input onChange={changeFormData('name')} value={formData.name} label="Name des Ziels" />
      <Input onChange={changeFormData('emojiIcon')} value={formData.emojiIcon || ''} label="Emoji des Ziels" />
      <Input
        onChange={changeFormData('target_amount', true)}
        value={formData.target_amount}
        label="Zielbetrag"
        min={0}
        suffix="€"
        step="0.01"
        type="number"
      />
      <Input
        onChange={changeFormData('savings_amount', true)}
        value={formData.savings_amount}
        label="Regulärer Betrag"
        min={0}
        suffix="€"
        step="0.01"
        type="number"
      />
      <Input
        onChange={changeFormData('amount', true)}
        value={formData.amount}
        label="Startbetrag"
        min={0}
        suffix="€"
        step="0.01"
        type="number"
      />
      <Select
        onChange={(newValue: any) =>
          setFormData((formData) => ({
            ...formData,
            savings_interval: parseInt(newValue.value, 10),
          }))
        }
        value={intervalOptions.filter((option) => parseInt(option.value, 10) === formData.savings_interval)}
        label="Intervall"
        options={intervalOptions}
      />
      {accounts && (
        <Select
          onChange={(newValue: any) =>
            setFormData((formData) => ({
              ...formData,
              bank_account_id: newValue.value,
            }))
          }
          value={accounts.filter((option) => option.value === formData.bank_account_id)}
          label="Konto"
          options={accounts}
        />
      )}

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
