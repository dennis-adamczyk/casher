import { ChangeEventHandler, FC, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { AddFormProps, AddFormWrapper, AddFormTitle, AddFormButtons } from './AddForm';
import { getAllSelectOptions } from '@/helpers/interval';
import { useRouter } from 'next/router';
import { Subscription } from '@prisma/client';
import Switch from '../ui/Switch';

const AddSubscriptionForm: FC<AddFormProps> = ({ title, accounts, categories }) => {
  const { back, push } = useRouter();
  const intervalOptions = getAllSelectOptions();
  const [isIncome, setIsIncome] = useState(false);
  const [formData, setFormData] = useState<Partial<Subscription>>({
    amount: 0,
    name: '',
    interval: 3,
  });

  const changeFormData = (field: keyof Subscription, isInt?: boolean) =>
    ((event) =>
      setFormData((formData) => ({
        ...formData,
        [field]: isInt ? parseFloat(event.target.value) : event.target.value,
      }))) as ChangeEventHandler<HTMLInputElement>;

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(formData);
    if (!isIncome && formData.amount !== undefined) {
      formData.amount = -formData.amount;
    }
    const result = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/api/subscription', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const { success } = await result.json();

    if (success) {
      push('/subscriptions');
    } else {
      alert('Upsi! Da ist etwas schief gelaufen...');
    }
  };

  return (
    <AddFormWrapper onSubmit={onSubmit}>
      <AddFormTitle>{title}</AddFormTitle>
      <Input onChange={changeFormData('name')} value={formData.name} label="Name des Ziels" />
      <Switch label={['Ausgabe', 'Einkommen']} value={isIncome} onChange={setIsIncome} />
      <Input
        onChange={changeFormData('amount', true)}
        value={formData.amount}
        label={isIncome ? 'Reguläres Einkommen' : 'Reguläre Kosten'}
        suffix="€"
        min={0}
        step="0.01"
        type="number"
      />
      <Select
        onChange={(newValue: any) =>
          setFormData((formData) => ({
            ...formData,
            interval: parseInt(newValue.value, 10),
          }))
        }
        value={intervalOptions.filter((option) => parseInt(option.value, 10) === formData.interval)}
        label="Intervall"
        options={intervalOptions}
      />
      {categories && (
        <Select
          onChange={(newValue: any) =>
            setFormData((formData) => ({
              ...formData,
              category_id: newValue.value,
            }))
          }
          value={categories.filter((option) => option.value === formData.category_id)}
          label="Kategorie"
          options={categories}
        />
      )}
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
