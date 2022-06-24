import MoneyOverview from '@/components/common/MoneyOverview';
import Content from '@/components/layout/Content';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Content>
      <MoneyOverview />
    </Content>
  );
};

export default Home;
