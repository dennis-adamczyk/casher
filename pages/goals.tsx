import Content from '@/components/layout/Content';
import { FC } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import GoalCard from '@/components/common/GoalCard';

const EmptyWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'normal',
    alignItems: 'stretch',
    height: '100%',
  }),
);

const GoalTitle = styled.div(
  css({
    fontSize: 'large',
    fontWeight: 'semiBold',
    marginBottom: 4,
  }),
)

const GoalsSection = styled.section(css({}));

interface GoalCardData {
  id: number,
  bankAccountId: number,
  emojiIcon: string,
  name: string,
  targetAmount: number,
  amount: number,
  savingIntervall: string,
  savingAmount: number
}

const Goals: FC<{ goals: GoalCardData[] }> = ({ goals }) => {
  console.log(goals)
  return (
    <Content>
      <EmptyWrapper>
        <GoalTitle>Deine Ziele</GoalTitle>
        <GoalsSection>
          { goals.map((goal)=>(
            <GoalCard
              key={goal.id}
              name={goal.name}
              subtitle={String(goal.savingAmount)}
            />
          ))}
        </GoalsSection>
      </EmptyWrapper>
    </Content>
  );
};

export default Goals;


export async function getServerSideProps(context: any) {
    const res = await fetch(`http://localhost:3000/api/goals`);
    const data: GoalCardData[] = await res.json();
    return {
      props: { goals: data },
    };
  }
