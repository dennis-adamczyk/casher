import AddSubscriptionButton from '@/components/common/AddButton';
import Collapse from '@/components/common/Collapse';
import SubscriptionCard from '@/components/common/SubscriptionCard';
import Content from '@/components/layout/Content';
import { interval } from '@/constants/interval';
import { formatCurrency } from '@/helpers/formatter';
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

const Subscriptions: NextPage<{ data: [SubscriptionData, CategoryData][], totalSubscriptionCost: number }> = ({ data, totalSubscriptionCost}) => {
  const subscriptionCategories: (CategoryData & { subscriptions: SubscriptionData[] })[] = [];
  for (const [subscription, category] of data) {
    const subscriptionCategoryIndex = subscriptionCategories.findIndex(
      (subscriptionCategory) => subscriptionCategory.id === category.id,
    );
    if (subscriptionCategoryIndex === -1) {
      subscriptionCategories.push({
        ...category,
        subscriptions: [subscription],
      });
    } else {
      subscriptionCategories[subscriptionCategoryIndex].subscriptions.push(subscription);
    }
  }

  return (
    <Content>
      <SubscriptionsHeader>
        <SubscriptionsTitle>Regelmäßige Ausgaben</SubscriptionsTitle>
        <SubscriptionsTotalWrapper>
          <SubscriptionsTotal>{formatCurrency(totalSubscriptionCost)}</SubscriptionsTotal>
          <SubscriptionsTotalInterval>monatlich</SubscriptionsTotalInterval>
        </SubscriptionsTotalWrapper>
      </SubscriptionsHeader>

      {subscriptionCategories.map((category, index) => (
        <SubscriptionCollapse title={category.name} defaultOpen={index === 0} key={category.id}>
          {category.subscriptions.map((subscription) => (
            <SubscriptionCollapseCard
              name={subscription.name}
              amount={subscription.amount}
              interval={subscription.interval}
              key={subscription.id}
            />
          ))}
        </SubscriptionCollapse>
      ))}

      <AddSubscriptionButton href="/subscriptions/new">Neues Abo</AddSubscriptionButton>
    </Content>
  );
};

export async function getServerSideProps(context: any) {
  const [fetch1, fetch2] = await Promise.all([fetch(`http://localhost:3000/api/subscriptionWithCategory`), 
                                              fetch(`http://localhost:3000/api/totalSubscriptions`)]);
  const data1: [SubscriptionData, CategoryData][] = await fetch1.json();
  const data2 = await fetch2.json();

  return {
    props: { data: data1, totalSubscriptionCost: data2 },
  };
}

export default Subscriptions;
