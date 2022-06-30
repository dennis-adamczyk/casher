import AddSubscriptionForm from '@/components/common/AddSubscriptionForm';
import Content from '@/components/layout/Content';
import { SelectOption } from '@/helpers/selectOptions';
import { DBClient } from '@/data/database';
import type { GetServerSideProps, NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export interface AddSubscriptionsProps {
  accounts: SelectOption[];
  categories: SelectOption[];
}

const Subscriptions: NextPage<AddSubscriptionsProps> = (props) => {
  return (
    <Content>
      <AddSubscriptionForm title="Neues Abo" accounts={props.accounts} categories={props.categories} />
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accounts = await DBClient.bank_Account.findMany();
  const categories = await DBClient.category.findMany();

  const accOptions: SelectOption[] = accounts.map((acc) => {
    return { value: acc.id, label: acc.bank_name || '' };
  });
  const catOptions: SelectOption[] = categories.map((cat) => {
    return { value: cat.id, label: cat.name };
  });
  return {
    props: { accounts: accOptions, categories: catOptions },
  };
};

export default withPageAuthRequired(Subscriptions);
