import Content from '@/components/layout/Content';
import { FC } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import GoalCard from '@/components/common/GoalCard';
import { GetServerSideProps } from 'next/types';
import { GoalData } from '.';
import AnalysisLineChart, { AnalysisLineChartProps } from '@/components/analysis/Line';
import { formatCurrency } from '@/helpers/formatter';
import { AnalysisDataLine } from '../analysis';
import { ChartData } from 'chart.js';


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

const Goals: FC<{ goal: GoalData }> = ({ goal }) => {
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
        <select>
            <option value="daily">Täglich</option>
            <option value="weekly">Wöchtenlich</option>
            <option value="monthly">Monatlich</option>
            <option value="yearly">Jährlich</option>
        </select>
      </GoalRegularSpending>
      <GoalExpectedFinishHeader>Vorraussichtlich wirst du dein Ziel erreichen in</GoalExpectedFinishHeader>
      <GoalExpectedFinisherTimerWrapper>
        <GoalExpectedFinisherTimerItem>
            <GoalExpectedFinisherTimerItemTime>28</GoalExpectedFinisherTimerItemTime>
            <GoalExpectedFinisherTimerItemLabel>Monate</GoalExpectedFinisherTimerItemLabel>
        </GoalExpectedFinisherTimerItem>
        <GoalExpectedFinisherTimerItem>
            <GoalExpectedFinisherTimerItemTime>14</GoalExpectedFinisherTimerItemTime>
            <GoalExpectedFinisherTimerItemLabel>Tage</GoalExpectedFinisherTimerItemLabel>
        </GoalExpectedFinisherTimerItem>
      </GoalExpectedFinisherTimerWrapper>
      <br></br>
        <GoalPastSavingsHeader>Einzahlungen</GoalPastSavingsHeader>
        <GoalPastSavingsItem>
            <GoalPastSavingsItemLeft>{formatCurrency(50)}</GoalPastSavingsItemLeft>
            <GoalPastSavingsItemRight>Heute</GoalPastSavingsItemRight>  
        </GoalPastSavingsItem>
        <br></br>
        <GoalPastSavingsItem>
            <GoalPastSavingsItemLeft>{formatCurrency(50)}</GoalPastSavingsItemLeft>
            <GoalPastSavingsItemRight>Gestern</GoalPastSavingsItemRight>  
        </GoalPastSavingsItem>
        <br></br>
        <GoalPastSavingsItem>
            <GoalPastSavingsItemLeft>{formatCurrency(50)}</GoalPastSavingsItemLeft>
            <GoalPastSavingsItemRight>Vorgestern</GoalPastSavingsItemRight>  
        </GoalPastSavingsItem>
    </Content>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  if(context.params){
    const res = await fetch(`http://localhost:3000/api/goals/${context.params["id"]}`);
    const data: GoalData = await res.json();
    
    return {
      props: { goal: data },
    };  
  }else{
    return {props: {goal: null}}
  }
  
}

export default Goals;
