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
import { Analysis, Analysis_Data } from '@prisma/client';
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

const AnalysisPage: FC<{ analyses: (Analysis & { data: Analysis_Data })[] }> = (props) => {
  const [analysisModules, setAnalysisModules] = useState(props.analyses);

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
          {analysis.type === 'pie' ? (
            <AnalysisPieChart data={JSON.parse(analysis.data?.data || '') as AnalysisPieChartProps['data']} />
          ) : (
            <AnalysisLineChart data={JSON.parse(analysis.data?.data || '') as AnalysisLineChartProps['data']} />
          )}
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

  return {
    props: { analyses: data },
  };
}

export default withPageAuthRequired(AnalysisPage);
