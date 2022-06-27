import AddSubscriptionForm from '@/components/common/AddSubscriptionForm';
import { BankCardData } from '@/components/common/BankCard';
import Content from '@/components/layout/Content';
import { interval } from '@/constants/interval';
import { selectOption } from '@/constants/selectOptions';
import type { GetServerSideProps, NextPage } from 'next';
import { CategoryData } from '.';

export interface SubscriptionData {
  id: number;
  name: string;
  amount: number;
  bankAccountId: number;
  categoryId: number;
  interval: interval;
}

export interface AddSubscriptionsProps {
  accounts: selectOption[]
  categories: selectOption[]
}


const Subscriptions: NextPage<AddSubscriptionsProps> = (props) => {
  return (
    <Content>
      <AddSubscriptionForm title="Neues Abo" accounts={props.accounts} categories={props.categories}/>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accRes = await fetch(`http://localhost:3000/api/cards`);
  const catRes = await fetch(`http://localhost:3000/api/categories`);

  const accData = await accRes.json() as BankCardData[]
  const catData = await catRes.json() as CategoryData[]
  
  const accOptions: selectOption[] = accData.map((acc)=>{
    return {value: acc.id, label: acc.bankName || ''}
  })
  const catOptions: selectOption[] = catData.map((cat)=>{
    return {value: cat.id, label: cat.name}
  })
  return {
    props: {accounts: accOptions, categories: catOptions}
  };  
}


export default Subscriptions;
