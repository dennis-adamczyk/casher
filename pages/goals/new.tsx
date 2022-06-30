import AddGoalForm from '@/components/common/AddGoalForm';
import Content from '@/components/layout/Content';
import { SelectOption } from '@/helpers/selectOptions';
import { DBClient } from '@/data/database';
import type { GetServerSideProps, NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export interface AddGoalProps {
  accounts: SelectOption[];
}

const Goals: NextPage<AddGoalProps> = (props) => {
  return (
    <Content>
      <AddGoalForm title="Neues Sparziel" accounts={props.accounts} />
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

export default withPageAuthRequired(Goals);
