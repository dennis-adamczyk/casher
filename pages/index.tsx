import AddAcountButton from '@/components/common/AddButton';
import BankCard, { BankCardData, BankName } from '@/components/common/BankCard';
import MoneyOverview from '@/components/common/MoneyOverview';
import Content from '@/components/layout/Content';
import css from '@styled-system/css';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { monthlySavingsData } from './api/monthlySavings';

const AccountsSection = styled.section(css({}));

const AccountsTitle = styled.h2(
  css({
    fontSize: 'large',
    fontWeight: 'semiBold',
    marginBottom: 4,
  }),
);

const Home: NextPage<{ cards: BankCardData[], monthlySavings: number, monthlySubscriptions: number }> = ({ cards, monthlySavings, monthlySubscriptions }) => {
  const totalBalance = cards.reduce((total, current) => total + current.balance, 0);
  const totalEffectiveBalance = cards.reduce((total, current) => total + current.effectiveBalance, 0);

  return (
    <Content>
      <MoneyOverview marginBottom={10} balance={totalBalance} effectiveBalance={totalEffectiveBalance} savingAmount={monthlySavings} subscriptionAmount={monthlySubscriptions}/>
      <AccountsSection>
        <AccountsTitle>Deine Konten</AccountsTitle>
        {cards.map((card) => (
          <BankCard
            key={card.id}
            bank={card.bank}
            bankName={card.bankName}
            holder={card.holder}
            iban={card.iban}
            balance={card.balance}
            effectiveBalance={card.effectiveBalance}
          />
        ))}

        <AddAcountButton>Neues Konto</AddAcountButton>
      </AccountsSection>
    </Content>
  );
};

export async function getServerSideProps(context: any) {
  const [fetch1, fetch2, fetch3] = await Promise.all([
    fetch(`http://localhost:3000/api/cards`), 
    fetch(`http://localhost:3000/api/monthlySavings`),
    fetch(`http://localhost:3000/api/totalSubscriptions`)
  ])
  const data0: BankCardData[] = await fetch1.json();
  const data1: monthlySavingsData = await fetch2.json();
  const data2: number = await fetch3.json();
  
  return {
    props: { cards: data0, monthlySavings: data1.monthlySavings, monthlySubscriptions: data2},
  };
}



export default Home;
