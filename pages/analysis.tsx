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

export interface AnalysisDataPie {
  id: number,
  bankAccountId: number,
  type: "pie",
  name: string,
  data: AnalysisPieChartProps["data"]
}

export interface AnalysisDataLine {
  id: number,
  bankAccountId: number,
  type: "line",
  name: string,
  data: AnalysisLineChartProps["data"]
}

export type AnalysisData = AnalysisDataLine | AnalysisDataPie

const Analysis: FC<{ analyses: AnalysisData[] }> = ({analyses}) => {
  console.log(analyses);
  
  const [analysisModules, setAnalysisModules] = useState(analyses);

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
      { analysisModules.map((analysis)=>(<AnalysisCard 
        key={analysis.id} 
        name={analysis.name}  
        >
        { analysis.type === "pie" ? <AnalysisPieChart data={analysis.data} /> : <AnalysisLineChart data={analysis.data}></AnalysisLineChart>}
        
      </AnalysisCard>))}
    </Content>
  );
};

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://localhost:3000/api/analysis`);
  const data: AnalysisData[] = await res.json();
  console.log(data);
  return {
    props: { analyses: data },
  };
}

export default Analysis;
