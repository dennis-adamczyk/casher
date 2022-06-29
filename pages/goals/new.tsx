import AddGoalForm from '@/components/common/AddGoalForm';
import Content from '@/components/layout/Content';
import { selectOption } from '@/constants/selectOptions';
import { DBClient } from '@/data/database';
import type { GetServerSideProps, NextPage } from 'next';

export interface AddGoalProps {
  accounts: selectOption[];
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

  const accOptions: selectOption[] = accounts.map((acc) => {
    return { value: acc.id, label: acc.bank_name || '' };
  });
  return {
    props: { accounts: accOptions },
  };
};

export default Goals;
