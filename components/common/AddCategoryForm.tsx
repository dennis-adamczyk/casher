import { ChangeEventHandler, FC, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { AddFormProps, AddFormWrapper, AddFormTitle, AddFormButtons } from './AddForm';
import { useRouter } from 'next/router';
import { Category, Goal } from '@prisma/client';

const AddCategoryForm: FC<AddFormProps> = ({ title }) => {
  const { back } = useRouter();
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
  });

  const changeFormData = (field: keyof Goal) =>
    ((event) =>
      setFormData((formData) => ({
        ...formData,
        [field]: event.target.value,
      }))) as ChangeEventHandler<HTMLInputElement>;

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(formData);
    const result = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/api/category', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const content = await result.json();
    console.log(content);
  };

  return (
    <AddFormWrapper onSubmit={onSubmit}>
      <AddFormTitle>{title}</AddFormTitle>
      <Input onChange={changeFormData('name')} value={formData.name} label="Name des Ziels" />
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

export default AddCategoryForm;
