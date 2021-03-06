import AddAcountButton from '@/components/common/AddButton';
import BankCard from '@/components/common/BankCard';
import MoneyOverview from '@/components/common/MoneyOverview';
import Content from '@/components/layout/Content';
import { getIntervalMonthlyFactor } from '@/helpers/interval';
import { DBClient } from '@/data/database';
import { Bank_Account } from '@prisma/client';
import css from '@styled-system/css';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const AccountsSection = styled.section(css({}));

const AccountsTitle = styled.h2(
  css({
    fontSize: 'large',
    fontWeight: 'semiBold',
    marginBottom: 4,
  }),
);

type accountWithMonthlyGoalCost = {
  bankAccountId: string;
  totalMonthlyGoalCost: number;
};

type accountWithMonthlySubCost = {
  bankAccountId: string;
  totalMonthlySubscriptionCost: number;
};

const Home: NextPage<{
  cards: Bank_Account[];
  monthlySavings: accountWithMonthlyGoalCost[];
  monthlySubscriptions: accountWithMonthlySubCost[];
}> = ({ cards, monthlySavings, monthlySubscriptions }) => {
  const totalBalance = cards.reduce((total, current) => total + current.balance, 0);
  const totalSavings = monthlySavings.reduce((total, current) => total + current.totalMonthlyGoalCost, 0);
  const totalSubscriptions = monthlySubscriptions.reduce(
    (total, current) => total + current.totalMonthlySubscriptionCost,
    0,
  );
  const totalEffectiveBalance = totalBalance - (totalSavings + totalSubscriptions);

  function calculateEffectiveBalance(pCard: Bank_Account): number {
    const savings = monthlySavings.find((val) => val.bankAccountId === pCard.id)?.totalMonthlyGoalCost || 0;
    const subscriptions =
      monthlySubscriptions.find((val) => val.bankAccountId === pCard.id)?.totalMonthlySubscriptionCost || 0;
    return pCard.balance - (savings + subscriptions);
  }

  return (
    <Content>
      <MoneyOverview
        marginBottom={10}
        balance={totalBalance}
        effectiveBalance={totalEffectiveBalance}
        savingAmount={totalSavings}
        subscriptionAmount={totalSubscriptions}
      />
      <AccountsSection>
        <AccountsTitle>Deine Konten</AccountsTitle>
        {cards.map((card) => (
          <BankCard
            key={card.id}
            bank={card.bank as | 'sparkasse' | 'volksbank' | 'commerzbank'}
            bankName={card.bank_name}
            holder={card.holder}
            iban={card.iban}
            balance={card.balance}
            effectiveBalance={calculateEffectiveBalance(card)}
          />
        ))}

        <AddAcountButton href="/cards/new">Neues Konto</AddAcountButton>
      </AccountsSection>
    </Content>
  );
};

export async function getServerSideProps(context: any) {
  const accounts = await DBClient.bank_Account.findMany();

  const monthlySavingCostByCard: accountWithMonthlyGoalCost[] = await Promise.all(
    accounts.map(async (acc) => {
      const goals = await DBClient.goal.findMany({
        where: {
          bank_account_id: {
            equals: acc.id,
          },
        },
      });

      const monthlyGoalCost = goals.reduce((prev, current) => {
        return prev + current.savings_amount * getIntervalMonthlyFactor(current.savings_interval);
      }, 0);

      return {
        bankAccountId: acc.id,
        totalMonthlyGoalCost: monthlyGoalCost,
      };
    }),
  );

  const monthlySubCostByCard: accountWithMonthlySubCost[] = await Promise.all(
    accounts.map(async (acc) => {
      const goals = await DBClient.subscription.findMany({
        where: {
          bank_account_id: {
            equals: acc.id,
          },
        },
      });

      const monthlySubCost = goals
        .filter((goal) => goal.amount < 0)
        .map((goal) => ({ ...goal, amount: Math.abs(goal.amount) }))
        .reduce((prev, current) => {
          return prev + current.amount * getIntervalMonthlyFactor(current.interval);
        }, 0);

      return {
        bankAccountId: acc.id,
        totalMonthlySubscriptionCost: monthlySubCost,
      };
    }),
  );

  return {
    props: { cards: accounts, monthlySavings: monthlySavingCostByCard, monthlySubscriptions: monthlySubCostByCard },
  };
}

export default withPageAuthRequired(Home);
