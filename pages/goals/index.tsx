import Content from '@/components/layout/Content';
import { FC } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import GoalCard from '@/components/common/GoalCard';
import AddGoalButton from '@/components/common/AddButton';
import { AnalysisDataLine } from '../analysis';
import { interval } from '@/constants/interval';

const GoalTitle = styled.h2(
  css({
    fontSize: 5,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginTop: 6,
    marginBottom: 10,
    color: 'body',
  }),
);

const GoalTitleSavingAmount = styled.span(
  css({
    color: 'blue.200',
  }),
);

const GoalTitleSecondary = styled.span(
  css({
    display: 'block',
    fontWeight: 'normal',
  }),
);

export interface GoalData {
  id: number;
  bankAccountId: number;
  emojiIcon: string;
  name: string;
  targetAmount: number;
  amount: number;
  savingIntervall: interval;
  savingAmount: number;
  data: AnalysisDataLine;
}

const Goals: FC<{ goals: GoalData[] }> = ({ goals }) => {
  return (
    <Content>
      <GoalTitle>
        Wir haben <GoalTitleSavingAmount>25,00 €</GoalTitleSavingAmount> gespart,
        <GoalTitleSecondary>seit du das letzte mal geguckt hast</GoalTitleSecondary>
      </GoalTitle>
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          name={goal.name}
          amount={goal.amount}
          targetAmount={goal.targetAmount}
          emojiIcon={goal.emojiIcon}
          id={goal.id}
        />
      ))}
      <AddGoalButton>Neues Sparziel</AddGoalButton>
    </Content>
  );
};

export default Goals;

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://localhost:3000/api/goals`);
  const data: GoalData[] = await res.json();
  return {
    props: { goals: data },
  };
}
