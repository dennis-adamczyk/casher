import Content from '@/components/layout/Content';
import type { NextPage } from 'next';
import AddCardForm from '@/components/common/AddCardForm';

const NewCards: NextPage = (props) => {
  return (
    <Content>
      <AddCardForm title="Neuer Bankaccount"/>
    </Content>
  );
};

export default NewCards;
