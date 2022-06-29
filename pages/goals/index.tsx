import Content from '@/components/layout/Content';
import { FC } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import GoalCard from '@/components/common/GoalCard';
import AddGoalButton from '@/components/common/AddButton';
import { DBClient } from '@/data/database';
import { Goal } from '@prisma/client';

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

const Goals: FC<{ goals: Goal[] }> = ({ goals }) => {
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
          target_amount={goal.target_amount}
          emojiIcon={goal.emojiIcon}
          id={goal.id}
        />
      ))}
      <AddGoalButton href="/goals/new">Neues Sparziel</AddGoalButton>
    </Content>
  );
};

export default Goals;

export async function getServerSideProps(context: any) {
  const goals = await DBClient.goal.findMany();
  return {
    props: { goals: goals },
  };
}
