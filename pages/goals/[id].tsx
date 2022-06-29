import Content from '@/components/layout/Content';
import { FC, useState } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import GoalCard from '@/components/common/GoalCard';
import { GetServerSideProps } from 'next/types';
import AnalysisLineChart, { AnalysisLineChartProps } from '@/components/analysis/Line';
import { formatCurrency } from '@/helpers/formatter';
import Select from '@/components/ui/Select';
import {
  getIntervalMonthlyFactor,
  getSelectOptionFromInterval,
  interval,
  getAllSelectOptions,
} from '@/constants/interval';
import { DBClient } from '@/data/database';
import { Goal, Goal_History, Analysis_Data } from '@prisma/client';

const GoalTitle = styled.h2(
  css({
    fontSize: 5,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginTop: 6,
    marginBottom: 10,
  }),
);

const GoalRegularSpending = styled.h2(
  css({
    textAlign: 'center',
    fontSize: 5,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginTop: 6,
    marginBottom: 10,
  }),
);
const GoalRegularSpendingText = styled.p(
  css({
    display: 'inline',
    textAlign: 'center',
    fontSize: 5,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginTop: 6,
    marginBottom: 10,
    marginRight: 5,
  }),
);

const GoalExpectedFinishHeader = styled.h2(
  css({
    textAlign: 'center',
    fontSize: 4,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginTop: 6,
    marginBottom: 10,
  }),
);

const GoalExpectedFinisherTimerWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  }),
);

const GoalExpectedFinisherTimerItem = styled.div(
  css({
    marginLeft: 5,
    marginRight: 5,
  }),
);

const GoalExpectedFinisherTimerItemTime = styled.p(
  css({
    textAlign: 'center',
    fontSize: 6,
    fontWeight: 'Bold',
    lineHeight: 'body',
    marginRight: 5,
  }),
);

const GoalExpectedFinisherTimerItemLabel = styled.p(
  css({
    textAlign: 'center',
    fontSize: 4,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginRight: 5,
  }),
);

const GoalPastSavingsHeader = styled.h2(
  css({
    fontSize: 4,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginRight: 5,
  }),
);

const GoalPastSavingsItem = styled.div(
  css({
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }),
);

const GoalPastSavingsItemLeft = styled.div(
  css({
    float: 'left',
    fontSize: 4,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginRight: 5,
  }),
);
const GoalPastSavingsItemRight = styled.div(
  css({
    float: 'right',
    fontSize: 4,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginRight: 5,
  }),
);

type GoalHistory = GoalHistoryEntry[];

interface GoalHistoryEntry {
  date: string;
  value: number;
}

type data = Goal & {
  history: Goal_History;
  analysis_data: Analysis_Data;
};

const GoalPage: FC<{ goal: data }> = ({ goal }) => {
  const [RemainingDays, setRemainingDays] = useState(calculateRemainingDays(goal, goal.savings_interval));
  const [RemainingMonths, setRemainingMonths] = useState(calculateRemainingMonths(goal, goal.savings_interval));
  const history: GoalHistory = JSON.parse(goal.history.values) as GoalHistory;

  return (
    <Content>
      <GoalTitle>
        <GoalCard
          key={goal.id}
          name={goal.name}
          amount={goal.amount}
          target_amount={goal.target_amount}
          emojiIcon={goal.emojiIcon}
          id={goal.id}
          backgroundColor={'transparent'}
        />
      </GoalTitle>
      <AnalysisLineChart
        data={JSON.parse(goal.analysis_data.data || '') as AnalysisLineChartProps['data']}
      ></AnalysisLineChart>
      <GoalRegularSpending>
        <GoalRegularSpendingText>{formatCurrency(goal.savings_amount)}</GoalRegularSpendingText>
        <Select
          marginLeft={500}
          options={getAllSelectOptions()}
          defaultValue={getSelectOptionFromInterval(goal.savings_interval)}
          onChange={(value) => {
            let newSelect = value as { value: number; label: string };

            setRemainingMonths(calculateRemainingMonths(goal, newSelect.value as interval));
            setRemainingDays(calculateRemainingDays(goal, newSelect.value as interval));
          }}
        ></Select>
      </GoalRegularSpending>
      <GoalExpectedFinishHeader>Vorraussichtlich wirst du dein Ziel erreichen in</GoalExpectedFinishHeader>
      <GoalExpectedFinisherTimerWrapper>
        <GoalExpectedFinisherTimerItem>
          <GoalExpectedFinisherTimerItemTime>{RemainingMonths}</GoalExpectedFinisherTimerItemTime>
          <GoalExpectedFinisherTimerItemLabel>Monate</GoalExpectedFinisherTimerItemLabel>
        </GoalExpectedFinisherTimerItem>
        <GoalExpectedFinisherTimerItem>
          <GoalExpectedFinisherTimerItemTime>{RemainingDays}</GoalExpectedFinisherTimerItemTime>
          <GoalExpectedFinisherTimerItemLabel>Tage</GoalExpectedFinisherTimerItemLabel>
        </GoalExpectedFinisherTimerItem>
      </GoalExpectedFinisherTimerWrapper>
      <br></br>
      <GoalPastSavingsHeader>Einzahlungen</GoalPastSavingsHeader>
      {history.reverse().map((value, index) => (
        <>
          <GoalPastSavingsItem key={index}>
            <GoalPastSavingsItemLeft>{formatCurrency(value.value)}</GoalPastSavingsItemLeft>
            <GoalPastSavingsItemRight>{value.date}</GoalPastSavingsItemRight>
          </GoalPastSavingsItem>
          <br></br>
        </>
      ))}
    </Content>
  );
};

function calculateRemainingMonths(pGoal: Goal, pInterval: interval): number {
  return Math.floor(
    (pGoal.target_amount - pGoal.amount) / (pGoal.savings_amount * getIntervalMonthlyFactor(pInterval)),
  );
}

function calculateRemainingDays(pGoal: Goal, pInterval: interval): number {
  let paidPerMonth: number = pGoal.savings_amount * getIntervalMonthlyFactor(pInterval);
  let remMonthsTotal: number = calculateRemainingMonths(pGoal, pInterval) * paidPerMonth;
  let remPayedInDay: number = pGoal.target_amount - pGoal.amount - remMonthsTotal;
  return Math.ceil(remPayedInDay / (paidPerMonth / 31));
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    const goal = await DBClient.goal.findFirst({
      where: {
        id: context.params['id'] as string,
      },
      include: {
        analysis_data: true,
        history: true,
      },
    });
    return {
      props: { goal: goal },
    };
  } else {
    return { props: { goal: null } };
  }
};

export default GoalPage;
