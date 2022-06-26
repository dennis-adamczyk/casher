import AddSubscriptionButton from '@/components/common/AddButton';
import Collapse from '@/components/common/Collapse';
import SubscriptionCard from '@/components/common/SubscriptionCard';
import Content from '@/components/layout/Content';
import { interval } from '@/constants/interval';
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
  interval: interval;
}

export interface CategoryData {
  id: number;
  name: string;
}

const Subscriptions: NextPage<[SubscriptionData, CategoryData][]> = (props) => {
  return (
    <Content>
      <SubscriptionsHeader>
        <SubscriptionsTitle>Regelmäßige Ausgaben</SubscriptionsTitle>
        <SubscriptionsTotalWrapper>
          <SubscriptionsTotal>186,14 €</SubscriptionsTotal>
          <SubscriptionsTotalInterval>monatlich</SubscriptionsTotalInterval>
        </SubscriptionsTotalWrapper>
      </SubscriptionsHeader>

      {/* <SubscriptionCollapse title="Streaming" defaultOpen>
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Fitness">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Versicherungen">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Sparen">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Freizeit">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
      </SubscriptionCollapse>

      <SubscriptionCollapse title="Wohnen">
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
        <SubscriptionCollapseCard name="Spotify" amount={7.99} interval={interval.monthly} />
      </SubscriptionCollapse> */}

      <AddSubscriptionButton>Neues Abo</AddSubscriptionButton>
    </Content>
  );
};

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://localhost:3000/api/subscriptionWithCategory`);
  const data: [SubscriptionData, CategoryData][] = await res.json();
  
  return {
    props: { data },
  };
}

export default Subscriptions;
