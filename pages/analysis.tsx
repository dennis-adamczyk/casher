import Content from '@/components/layout/Content';
import Image from 'next/image';
import { FC, useState } from 'react';
import analysisIllustration from '@/assets/img/analysisIllustration.svg';
import styled from 'styled-components';
import css from '@styled-system/css';
import AddButton from '@/components/common/AddButton';
import AnalysisCard from '@/components/analysis/Card';
import AnalysisPieChart from '@/components/analysis/Pie';

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

interface AnalysisProps {}

const Analysis: FC<AnalysisProps> = () => {
  const [analysisModules, setAnalysisModules] = useState([{}]);

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
      {analysisModules.length && (
        <AnalysisCard name="Wofür gebe ich mein Geld aus?" subtitle="letzte 30 Tage">
          <AnalysisPieChart data={{}} />
        </AnalysisCard>
      )}
    </Content>
  );
};

export default Analysis;
