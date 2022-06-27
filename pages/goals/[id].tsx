import Content from '@/components/layout/Content';
import { FC, useState } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import GoalCard from '@/components/common/GoalCard';
import { GetServerSideProps } from 'next/types';
import { GoalData } from '.';
import AnalysisLineChart, { AnalysisLineChartProps } from '@/components/analysis/Line';
import { formatCurrency } from '@/helpers/formatter';
import Select from '@/components/ui/Select';
import {  getIntervalMonthlyFactor, getSelectOptionFromInterval, interval } from '@/constants/interval';

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
        textAlign: "center",
        fontSize: 5,
        fontWeight: 'semiBold',
        lineHeight: 'body',
        marginTop: 6,
        marginBottom: 10,
    })
)
const GoalRegularSpendingText = styled.p(
    css({
        display: "inline",
        textAlign: "center",
        fontSize: 5,
        fontWeight: 'semiBold',
        lineHeight: 'body',
        marginTop: 6,
        marginBottom: 10,
        marginRight: 5
    })
) 

const GoalExpectedFinishHeader = styled.h2(
    css({
        textAlign: "center",
        fontSize: 4,
        fontWeight: 'semiBold',
        lineHeight: 'body',
        marginTop: 6,
        marginBottom: 10,
    })
)

const GoalExpectedFinisherTimerWrapper = styled.div(
    css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    })
)

const GoalExpectedFinisherTimerItem = styled.div(
    css({
        marginLeft: 5,
        marginRight: 5
    })
)

const GoalExpectedFinisherTimerItemTime = styled.p(
    css({        
        textAlign: "center",
        fontSize: 6,
        fontWeight: 'Bold',
        lineHeight: 'body',
        marginRight: 5
    })
)

const GoalExpectedFinisherTimerItemLabel = styled.p(
    css({
        textAlign: "center",
        fontSize: 4,
        fontWeight: 'semiBold',
        lineHeight: 'body',
        marginRight: 5
    })
)

const GoalPastSavings = styled.div(
    css({

    })
)

const GoalPastSavingsHeader = styled.h2(
    css({
        fontSize: 4,
        fontWeight: 'semiBold',
        lineHeight: 'body',
        marginRight: 5
    })
)

const GoalPastSavingsItem = styled.div(css({
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
}))

const GoalPastSavingsItemLeft = styled.div(
    css({
        float: 'left',
        fontSize: 4,
        fontWeight: 'semiBold',
        lineHeight: 'body',
        marginRight: 5
    })
)
const GoalPastSavingsItemRight = styled.div(    
    css({
        float: 'right',
        fontSize: 4,
        fontWeight: 'semiBold',
        lineHeight: 'body',
        marginRight: 5
    })
)

export type GoalHistory = GoalHistoryEntry[]

export interface GoalHistoryEntry {
    date: string;
    value: number;
}

const Goals: FC<{ goal: GoalData, history: GoalHistory }> = ({ goal, history }) => {
  let options = []
  for(let val in interval){
    let intId = parseInt(val, 10)
    if(intId < 0 || isNaN(intId)) continue
    options.push(getSelectOptionFromInterval(intId as interval))
  }

  const [RemainingDays, setRemainingDays] = useState(calculateRemainingDays(goal, goal.savingIntervall))
  const [RemainingMonths, setRemainingMonths] = useState(calculateRemainingMonths(goal, goal.savingIntervall))
  

  return (
    <Content>
      <GoalTitle>      
        <GoalCard
          key={goal.id}
          name={goal.name}
          amount={goal.amount}
          targetAmount={goal.targetAmount}
          emojiIcon={goal.emojiIcon}
          id={goal.id}
          backgroundColor={'transparent'}
        />
      </GoalTitle>
      <AnalysisLineChart data={goal.data as {} as AnalysisLineChartProps["data"]}></AnalysisLineChart>
      <GoalRegularSpending>
        <GoalRegularSpendingText>{formatCurrency(goal.savingAmount)}</GoalRegularSpendingText>
        <Select marginLeft={500} options={options} defaultValue={getSelectOptionFromInterval(goal.savingIntervall)} onChange={(value)=>{
            let newSelect = value as {value: number, label: string}
            
            setRemainingMonths(calculateRemainingMonths(goal, newSelect.value as interval))
            setRemainingDays(calculateRemainingDays(goal, newSelect.value as interval))
        }}></Select>
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
        {history.reverse().map((value, index)=>(
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

function calculateRemainingMonths(pGoal: GoalData, pInterval: interval): number {
    return Math.floor((pGoal.targetAmount - pGoal.amount) / (pGoal.savingAmount * getIntervalMonthlyFactor(pInterval)) )
}

function calculateRemainingDays(pGoal: GoalData, pInterval: interval): number {
    let paidPerMonth: number = (pGoal.savingAmount * getIntervalMonthlyFactor(pInterval))
    let remMonthsTotal: number = calculateRemainingMonths(pGoal, pInterval) * paidPerMonth
    let remPayedInDay: number = ((pGoal.targetAmount - pGoal.amount) - remMonthsTotal)
    return Math.ceil( remPayedInDay/ (paidPerMonth / 31))
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if(context.params){
    const goalRes = await fetch(`http://localhost:3000/api/goals/${context.params["id"]}`);
    const goalData: GoalData = await goalRes.json();
    
    const historyRes = await fetch(`http://localhost:3000/api/goals/history/${goalData.historyId}`)
    const historyData: GoalHistory = await historyRes.json()
    return {
      props: { goal: goalData, history: historyData },
    };  
  }else{
    return {props: {goal: null}}
  }
  
}

export default Goals;
