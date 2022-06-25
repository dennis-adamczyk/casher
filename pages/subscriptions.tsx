import AddSubscriptionButton from '@/components/common/AddButton';
import Collapse from '@/components/common/Collapse';
import SubscriptionCard from '@/components/common/SubscriptionCard';
import Content from '@/components/layout/Content';
import css from '@styled-system/css';
import type { NextPage } from 'next';
import styled from 'styled-components';

const SubscriptionsHeader = styled.header(
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 6,
  }),
);

const SubscriptionsTitle = styled.h1(
  css({
    fontSize: 5,
    fontWeight: 'semiBold',
    color: 'body',
  }),
);

const SubscriptionsTotalWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: 4,
  }),
);

const SubscriptionsTotal = styled.p(
  css({
    fontSize: 'large',
    fontWeight: 'semiBold',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  }),
);

const SubscriptionsTotalInterval = styled.p(
  css({
    fontSize: 'small',
    textAlign: 'right',
    color: 'white.opacity.5',
  }),
);

const SubscriptionCollapse = styled(Collapse)(
  css({
    marginBottom: 4,

    '&:last-child': {
      marginBottom: 0,
    },
  }),
);

const SubscriptionCollapseCard = styled(SubscriptionCard)(
  css({
    marginBottom: 3,

    '&:last-child': {
      marginBottom: 0,
    },
  }),
);

export interface SubscriptionData {
  id: number;
  name: string;
  amount: number;
  bankAccountId: number;
  categoryId: number;
  interval: string;
}

const Subscriptions: NextPage = () => {
  return (
    <Content>
      <SubscriptionsHeader>
        <SubscriptionsTitle>Regelmäßige Ausgaben</SubscriptionsTitle>
        <SubscriptionsTotalWrapper>
          <SubscriptionsTotal>186,14 €</SubscriptionsTotal>
          <SubscriptionsTotalInterval>monatlich</SubscriptionsTotalInterval>
        </SubscriptionsTotalWrapper>
      </SubscriptionsHeader>

      <SubscriptionCollapse title="Streaming" defaultOpen>
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Fitness">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Versicherungen">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Sparen">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Freizeit">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Wohnen">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval="montalich" />
      </SubscriptionCollapse>

      <AddSubscriptionButton>Neues Abo</AddSubscriptionButton>
    </Content>
  );
};

export default Subscriptions;
