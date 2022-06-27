import AddGoalForm from '@/components/common/AddGoalForm';
import { BankCardData } from '@/components/common/BankCard';
import Content from '@/components/layout/Content';
import { selectOption } from '@/constants/selectOptions';
import type { GetServerSideProps, NextPage } from 'next';

export interface AddGoalProps {
  accounts: selectOption[]
}

const Goals: NextPage<AddGoalProps> = (props) => {
  return (
    <Content>
      <AddGoalForm title="Neues Sparziel" accounts={props.accounts}/>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accRes = await fetch(`http://localhost:3000/api/cards`);

  const accData = await accRes.json() as BankCardData[]
  
  const accOptions: selectOption[] = accData.map((acc)=>{
    return {value: acc.id, label: acc.bankName || ''}
  })
  return {
    props: {accounts: accOptions}
  };  
}

export default Goals;