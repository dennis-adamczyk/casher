import Content from '@/components/layout/Content';
import Image from 'next/image';
import { FC, useState } from 'react';
import analysisIllustration from '@/assets/img/analysisIllustration.svg';
import styled from 'styled-components';
import css from '@styled-system/css';
import AddButton from '@/components/common/AddButton';
import AnalysisCard from '@/components/analysis/Card';
import AnalysisPieChart, { AnalysisPieChartProps } from '@/components/analysis/Pie';
import AnalysisLineChart, { AnalysisLineChartProps } from '@/components/analysis/Line';
import { DBClient } from '@/data/database';
import { Analysis, Analysis_Data, Category, Goal, Subscription } from '@prisma/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const EmptyWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
  }),
);

const EmptyImageWrapper = styled.div(
  css({
    display: 'block',
    marginX: 'auto',
    width: '65%',
    marginBottom: 6,
  }),
);

const EmptyTitle = styled.p(
  css({
    fontSize: 'large',
    fontWeight: 'medium',
    textAlign: 'center',
    lineHeight: 'body',
    marginX: 2,
    marginBottom: 4,
  }),
);

const EmptyDescription = styled.p(
  css({
    color: 'white.opacity.7',
    lineHeight: 'body',
    textAlign: 'center',
    marginX: 2,
    marginBottom: 4,
  }),
);

const AnalysisPage: FC<{ analyses: (Analysis & { data: Analysis_Data })[], 
labelData: (Category & {subscriptions: Subscription[]; })[], goalData: Goal[]}> = (props) => {
  const [analysisModules, setAnalysisModules] = useState(props.analyses);

  function getAnalysis(analysis: Analysis & { data: Analysis_Data }): JSX.Element{
    switch(analysis.type){
      case "line":
        return <AnalysisLineChart data={JSON.parse(analysis.data?.data || '') as AnalysisLineChartProps['data']} />
      case "pie-pos":
        return <AnalysisPieChart data={JSON.parse(analysis.data?.data || '') as AnalysisPieChartProps['data']} labelCatData={props.labelData} onlyPositive={true}/>
      case "pie-neg":
        return <AnalysisPieChart data={JSON.parse(analysis.data?.data || '') as AnalysisPieChartProps['data']} labelCatData={props.labelData} onlyPositive={false}/>
      case "pie-goal":
        return <AnalysisPieChart data={JSON.parse(analysis.data?.data || '') as AnalysisPieChartProps['data']} labelGoalData={props.goalData} onlyPositive={true}/>
      default:
        return <></>
    }
  }

  return (
    <Content>
      {!analysisModules.length && (
        <EmptyWrapper>
          <EmptyImageWrapper>
            <Image src={analysisIllustration} alt="" layout="responsive" />
          </EmptyImageWrapper>
          <EmptyTitle>Füge Analysen hinzu, um deine Finanzen im Blick zu behalten</EmptyTitle>
          <EmptyDescription>
            Du kannst komplett selbst entscheiden, welche Informationen du sehen möchtest und wie sie angezeigt werden
            sollen.
          </EmptyDescription>
          <AddButton>Neue Analyse</AddButton>
        </EmptyWrapper>
      )}
      {analysisModules.map((analysis) => (
        <AnalysisCard key={analysis.id} name={analysis.name}>
          {
            getAnalysis(analysis)
          }
        </AnalysisCard>
      ))}
    </Content>
  );
};

export async function getServerSideProps(context: any) {
  const data: (Analysis & { data: Analysis_Data })[] = await DBClient.analysis.findMany({
    include: {
      data: true,
    },
  });

  const labelData = await DBClient.category.findMany({include:{subscriptions: true}})
  const goalData = await DBClient.goal.findMany()

  return {
    props: { analyses: data, labelData: labelData, goalData: goalData },
  };
}

export default withPageAuthRequired(AnalysisPage);
