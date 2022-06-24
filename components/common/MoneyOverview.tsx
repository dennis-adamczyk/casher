import dropPattern from '@/assets/img/dropPattern.svg';
import css from '@styled-system/css';
import { FC, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components';

const OverviewWrapper = styled.section(
  css({
    marginBottom: 10,
  }),
);

const OverviewCard = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    backgroundColor: 'primary.default',
    borderRadius: 'normal',
    overflow: 'hidden',
    paddingX: 4,
    paddingY: 5,

    '&::before': {
      content: "''",
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundImage: `url(${dropPattern.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '125% 75%',
    },
  }),
);

const OverviewCardPreheading = styled.p(
  css({
    fontSize: 'small',
    color: 'white.opacity.7',
    marginBottom: 1,
  }),
);

const OverviewCardAmount = styled.p(
  css({
    fontSize: 5,
    fontWeight: 'semiBold',
    marginBottom: 4,
  }),
);

interface OverviewPopoutWrapperProps {
  open?: boolean;
  openHeight?: number;
}

const OverviewPopoutWrapper = styled.div<OverviewPopoutWrapperProps>(({ open, openHeight, theme }) =>
  css({
    backgroundColor: 'gray.100',
    maxHeight: !open ? 8 : `${openHeight}px`,
    marginX: 3,
    marginTop: -5,
    borderRadius: 'normal',
    overflow: 'hidden',
    position: 'relative',
    transitionDuration: theme.transitions.duration.medium,
    transitionProperty: 'max-height',
    transitionTimingFunction: theme.transitions.timingFunction.normal,
  }),
);

const OverviewPopoutSummary = styled.div(
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingX: 4,
    height: 8,
  }),
);

const OverviewPopoutLabel = styled.p(
  css({
    fontSize: 1,
    color: 'black.opacity.6',
  }),
);

const OverviewPopoutLabelSecondary = styled.span(
  css({
    fontSize: 'small',
    color: 'black.opacity.4',
  }),
);

const OverviewPopoutSummaryValueGroup = styled.div(
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }),
);

const OverviewPopoutSummaryValue = styled.p(
  css({
    fontSize: 'large',
    fontWeight: 'semiBold',
    color: 'primary.default',
    textAlign: 'right',
    marginRight: 2,
  }),
);

interface OverviewPopoutIconProps {
  open?: boolean;
}

const OverviewPopoutIcon = styled(ChevronDown).attrs(({ theme }) => ({
  color: theme.colors.black.opacity[5],
  size: 16,
  strokeWidth: 3,
}))<OverviewPopoutIconProps>(({ open, theme }) =>
  css({
    ...(open && {
      transform: 'rotate(180deg)',
    }),
    transitionDuration: theme.transitions.duration.medium,
    transitionProperty: 'transform',
    transitionTimingFunction: theme.transitions.timingFunction.normal,
  }),
);

const OverviewPopoutDetailsRow = styled.div(
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  }),
);

const OverviewPopoutDetails = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 2,
    paddingX: 4,
    paddingBottom: 4,

    [`${OverviewPopoutDetailsRow}:last-child`]: {
      marginBottom: 0,
    },
  }),
);

const OverviewPopoutDetailsValue = styled.p(
  css({
    fontSize: 1,
    fontWeight: 'semiBold',
    color: 'black.opacity.8',
    textAlign: 'right',
  }),
);

interface MoneyOverviewProps {}

const MoneyOverview: FC<MoneyOverviewProps> = () => {
  const [open, setOpen] = useState(false);

  const openHeight = useRef(0);
  const popoutWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    openHeight.current = popoutWrapper.current?.scrollHeight || 0;
  });

  return (
    <OverviewWrapper>
      <OverviewCard>
        <OverviewCardPreheading>Zur freien Verfügung</OverviewCardPreheading>
        <OverviewCardAmount>4.907,75 €</OverviewCardAmount>
      </OverviewCard>
      <OverviewPopoutWrapper ref={popoutWrapper} open={open} openHeight={openHeight.current}>
        <OverviewPopoutSummary onClick={() => setOpen((open) => !open)}>
          <OverviewPopoutLabel>Gesamtkontostand</OverviewPopoutLabel>
          <OverviewPopoutSummaryValueGroup>
            <OverviewPopoutSummaryValue>5.239,34 €</OverviewPopoutSummaryValue>
            <OverviewPopoutIcon open={open} />
          </OverviewPopoutSummaryValueGroup>
        </OverviewPopoutSummary>
        <OverviewPopoutDetails>
          <OverviewPopoutDetailsRow>
            <OverviewPopoutLabel>Sparbetrag</OverviewPopoutLabel>
            <OverviewPopoutDetailsValue>145,45 €</OverviewPopoutDetailsValue>
          </OverviewPopoutDetailsRow>
          <OverviewPopoutDetailsRow>
            <OverviewPopoutLabel>
              Abobetrag <OverviewPopoutLabelSecondary>im Juni</OverviewPopoutLabelSecondary>
            </OverviewPopoutLabel>
            <OverviewPopoutDetailsValue>186,14 €</OverviewPopoutDetailsValue>
          </OverviewPopoutDetailsRow>
        </OverviewPopoutDetails>
      </OverviewPopoutWrapper>
    </OverviewWrapper>
  );
};

export default MoneyOverview;
