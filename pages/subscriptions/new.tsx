import AddSubscriptionForm from '@/components/common/AddSubscriptionForm';
import { BankCardData } from '@/components/common/BankCard';
import Content from '@/components/layout/Content';
import { interval } from '@/constants/interval';
import { selectOption } from '@/constants/selectOptions';
import { DBClient } from '@/data/database';
import type { GetServerSideProps, NextPage } from 'next';

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
  const accounts = await DBClient.bank_Account.findMany()
  const categories = await DBClient.category.findMany()
  
  const accOptions: selectOption[] = accounts.map((acc)=>{
    return {value: acc.id, label: acc.bank_name || ''}
  })
  const catOptions: selectOption[] = categories.map((cat)=>{
    return {value: cat.id, label: cat.name}
  })
  return {
    props: {accounts: accOptions, categories: catOptions}
  };  
}


export default Subscriptions;
