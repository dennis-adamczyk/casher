import AddForm from '@/components/common/AddForm';
import Content from '@/components/layout/Content';
import { interval } from '@/constants/interval';
import type { NextPage } from 'next';

export interface SubscriptionData {
  id: number;
  name: string;
  amount: number;
  bankAccountId: number;
  categoryId: number;
  interval: interval;
}

const Subscriptions: NextPage = () => {
  return (
    <Content>
      <AddForm title="Neues Abo" />
    </Content>
  );
};

export default Subscriptions;
