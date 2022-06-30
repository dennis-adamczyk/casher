import Content from '@/components/layout/Content';
import type { NextPage } from 'next';
import AddCardForm from '@/components/common/AddCardForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const NewCards: NextPage = () => {
  return (
    <Content>
      <AddCardForm title="Neuer Bankaccount" />
    </Content>
  );
};

export default withPageAuthRequired(NewCards);
