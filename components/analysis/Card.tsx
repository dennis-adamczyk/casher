import css from '@styled-system/css';
import { FC, ReactNode } from 'react';
import { ChevronRight } from 'react-feather';
import styled from 'styled-components';
import Button from '../ui/Button';

const AnalysisCardWrapper = styled.article(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'midnight.400',
    borderRadius: 'normal',
    overflow: 'hidden',
  }),
);

const AnalysisCardContent = styled.div(
  css({
    paddingX: 3,
    paddingY: 4,
  }),
);

const AnalysisCardHeader = styled.div(
  css({
    marginBottom: 5,
  }),
);

const AnalysisCardName = styled.h3(
  css({
    fontSize: 'text',
    fontWeight: 'semiBold',
    textAlign: 'left',
  }),
);

const AnalysisCardSubtitle = styled.p(
  css({
    fontSize: 'small',
    color: 'white.opacity.7',
    marginTop: 1,
  }),
);

const AnalysisCardButton = styled(Button).attrs({ block: true, bg: 'midnight.500', iconAfter: <ChevronRight /> })(
  css({
    borderRadius: 0,
    justifyContent: 'flex-end',
  }),
);

interface AnalysisCardProps {
  name: string;
  subtitle?: string;
  children?: ReactNode;
}

const AnalysisCard: FC<AnalysisCardProps> = ({ name, subtitle, children }) => {
  return (
    <AnalysisCardWrapper>
      <AnalysisCardContent>
        <AnalysisCardHeader>
          <AnalysisCardName>{name}</AnalysisCardName>
          {subtitle && <AnalysisCardSubtitle>{subtitle}</AnalysisCardSubtitle>}
        </AnalysisCardHeader>
        {children}
      </AnalysisCardContent>
      <AnalysisCardButton>Zur Analyse</AnalysisCardButton>
    </AnalysisCardWrapper>
  );
};

export default AnalysisCard;
