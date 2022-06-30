import Content from '@/components/layout/Content';
import { FC, useState } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import GoalCard from '@/components/common/GoalCard';
import { GetServerSideProps } from 'next/types';
import AnalysisLineChart, { AnalysisLineChartProps } from '@/components/analysis/Line';
import { formatCurrency, formatDate } from '@/helpers/formatter';
import Select from '@/components/ui/Select';
import {
  getIntervalMonthlyFactor,
  getSelectOptionFromInterval,
  Interval,
  getAllSelectOptions,
} from '@/helpers/interval';
import { DBClient } from '@/data/database';
import { Goal, Goal_History, Analysis_Data } from '@prisma/client';

const GoalTitle = styled.h2(
  css({
    fontSize: 5,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginBottom: 10,
  }),
);

const GoalRegularSpending = styled.div(
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
    fontSize: 'large',
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginTop: 6,
    marginBottom: 5,
  }),
);

const GoalExpectedFinisherTimerWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 10,
  }),
);

const GoalExpectedFinisherTimerItem = styled.div(
  css({
    marginRight: 8,

    '&:last-child': {
      marginRight: 0,
    },
  }),
);

const GoalExpectedFinisherTimerItemTime = styled.p(
  css({
    textAlign: 'center',
    fontSize: 7,
  }),
);

const GoalExpectedFinisherTimerItemLabel = styled.p(
  css({
    textAlign: 'center',
    color: 'white.opacity.7',
  }),
);

const GoalPastSavingsHeader = styled.h2(
  css({
    fontSize: 5,
    fontWeight: 'semiBold',
    lineHeight: 'body',
    marginBottom: 4,
  }),
);

const GoalPastSavingsItem = styled.div(
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'midnight.500',
    borderRadius: 'smaller',
    paddingX: 4,
    paddingY: 3,
    marginBottom: 3,
  }),
);

const GoalPastSavingsItemDate = styled.div(
  css({
    lineHeight: 'body',
    marginRight: 5,
  }),
);

interface GoalPastSavingsItemAmountProps {
  negative?: boolean;
}

const GoalPastSavingsItemAmount = styled.div<GoalPastSavingsItemAmountProps>(({ negative }) =>
  css({
    fontWeight: 'semiBold',
    lineHeight: 'body',
    textAlign: 'right',
    color: negative ? 'red.opacity.8' : 'blue.200',
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
  const [remainingDays, setRemainingDays] = useState(calculateRemainingDays(goal, goal.savings_interval));
  const [remainingMonths, setRemainingMonths] = useState(calculateRemainingMonths(goal, goal.savings_interval));
  let history : GoalHistory | undefined
  
  if (goal.history != undefined){
    history = JSON.parse(goal.history.values) as GoalHistory;

  }

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
          backgroundColor="transparent"
          hideChevron
        />
      </GoalTitle>
      {
        (goal.analysis_data != undefined) && <AnalysisLineChart data={JSON.parse(goal.analysis_data.data || '') as AnalysisLineChartProps['data']} />
      
      }
      <GoalRegularSpending>
        <GoalRegularSpendingText>{formatCurrency(goal.savings_amount)}</GoalRegularSpendingText>
        <Select
          options={getAllSelectOptions()}
          defaultValue={getSelectOptionFromInterval(goal.savings_interval)}
          onChange={(value) => {
            let newSelect = value as { value: number; label: string };

            setRemainingMonths(calculateRemainingMonths(goal, newSelect.value as Interval));
            setRemainingDays(calculateRemainingDays(goal, newSelect.value as Interval));
          }}
        ></Select>
      </GoalRegularSpending>
      <GoalExpectedFinishHeader>Vorraussichtlich wirst du dein Ziel erreichen in</GoalExpectedFinishHeader>
      <GoalExpectedFinisherTimerWrapper>
        <GoalExpectedFinisherTimerItem>
          <GoalExpectedFinisherTimerItemTime>{remainingMonths}</GoalExpectedFinisherTimerItemTime>
          <GoalExpectedFinisherTimerItemLabel>Monate</GoalExpectedFinisherTimerItemLabel>
        </GoalExpectedFinisherTimerItem>
        <GoalExpectedFinisherTimerItem>
          <GoalExpectedFinisherTimerItemTime>{remainingDays}</GoalExpectedFinisherTimerItemTime>
          <GoalExpectedFinisherTimerItemLabel>Tage</GoalExpectedFinisherTimerItemLabel>
        </GoalExpectedFinisherTimerItem>
      </GoalExpectedFinisherTimerWrapper>

      <GoalPastSavingsHeader>Einzahlungen</GoalPastSavingsHeader>
      {(history != undefined ) && (history.reverse().map((record, index) => (
        <GoalPastSavingsItem key={index}>
          <GoalPastSavingsItemDate>{formatDate(new Date(record.date))}</GoalPastSavingsItemDate>
          <GoalPastSavingsItemAmount negative={record.value < 0}>
            {formatCurrency(record.value)}
          </GoalPastSavingsItemAmount>
        </GoalPastSavingsItem>
      )))}
    </Content>
  );
};

function calculateRemainingMonths(pGoal: Goal, pInterval: Interval): number {
  if (typeof pInterval === 'string') {
    pInterval = parseInt(pInterval, 10) as Interval;
  }
  return Math.floor(
    (pGoal.target_amount - pGoal.amount) / (pGoal.savings_amount * getIntervalMonthlyFactor(pInterval)),
  );
}

function calculateRemainingDays(pGoal: Goal, pInterval: Interval): number {
  if (typeof pInterval === 'string') {
    pInterval = parseInt(pInterval, 10) as Interval;
  }
  const paidPerMonth: number = pGoal.savings_amount * getIntervalMonthlyFactor(pInterval);
  const remMonthsTotal: number = calculateRemainingMonths(pGoal, pInterval) * paidPerMonth;
  const remPayedInDay: number = pGoal.target_amount - pGoal.amount - remMonthsTotal;
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
