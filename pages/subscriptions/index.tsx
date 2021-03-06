import AddSubscriptionButton from '@/components/common/AddButton';
import Collapse from '@/components/common/Collapse';
import SubscriptionCard from '@/components/common/SubscriptionCard';
import Content from '@/components/layout/Content';
import { getIntervalMonthlyFactor } from '@/helpers/interval';
import { DBClient } from '@/data/database';
import { formatCurrency } from '@/helpers/formatter';
import { Bank_Account, Category, Subscription } from '@prisma/client';
import css from '@styled-system/css';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

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

const AddButtonWrapper = styled.div(
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 4,
  }),
);

type data = (Category & {
  subscriptions: (Subscription & {
    bank_account: Bank_Account;
  })[];
})[];

const Subscriptions: NextPage<{ categories: data; totalSubscriptionCost: number }> = ({
  categories,
  totalSubscriptionCost,
}) => {
  return (
    <Content>
      <SubscriptionsHeader>
        <SubscriptionsTitle>Regelm????ige Ver??nderung</SubscriptionsTitle>
        <SubscriptionsTotalWrapper>
          <SubscriptionsTotal>{formatCurrency(totalSubscriptionCost)}</SubscriptionsTotal>
          <SubscriptionsTotalInterval>monatlich</SubscriptionsTotalInterval>
        </SubscriptionsTotalWrapper>
      </SubscriptionsHeader>
      {categories.map((category, index) => (
        <SubscriptionCollapse title={category.name} defaultOpen={index === 0} key={category.id}>
          {category.subscriptions.map((sub) => (
            <SubscriptionCollapseCard
              name={sub.name}
              amount={sub.amount}
              interval={sub.interval}
              key={sub.id}
              bank_name={sub.bank_account.bank_name}
            />
          ))}
        </SubscriptionCollapse>
      ))}
      <AddButtonWrapper>
        <AddSubscriptionButton href="/category/new" mx={0}>
          Neue Kategorie
        </AddSubscriptionButton>
        <AddSubscriptionButton href="/subscriptions/new" mx={0}>
          Neues Abo
        </AddSubscriptionButton>
      </AddButtonWrapper>
    </Content>
  );
};

export async function getServerSideProps(context: any) {
  const data = await DBClient.category.findMany({
    include: {
      subscriptions: {
        include: {
          bank_account: true,
        },
      },
    },
  });

  const subs = await DBClient.subscription.findMany();
  const cost = subs.reduce((prev, current) => {
    const subCost = current.amount * getIntervalMonthlyFactor(current.interval);
    return prev + subCost;
  }, 0);

  return {
    props: { categories: data, totalSubscriptionCost: cost },
  };
}

export default withPageAuthRequired(Subscriptions);
