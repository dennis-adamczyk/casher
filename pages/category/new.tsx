import Content from '@/components/layout/Content';
import { SelectOption } from '@/helpers/selectOptions';
import { DBClient } from '@/data/database';
import type { GetServerSideProps, NextPage } from 'next';
import AddCategoryForm from '@/components/common/AddCategoryForm';

const Goals: NextPage = (props) => {
  return (
    <Content>
      <AddCategoryForm title="Neue Kategorie"/>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accounts = await DBClient.bank_Account.findMany();

  const accOptions: SelectOption[] = accounts.map((acc) => {
    return { value: acc.id, label: acc.bank_name || '' };
  });
  return {
    props: { accounts: accOptions },
  };
};

export default Goals;
