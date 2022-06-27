import AddAcountButton from '@/components/common/AddButton';
import BankCard, { BankCardData, BankName } from '@/components/common/BankCard';
import MoneyOverview from '@/components/common/MoneyOverview';
import Content from '@/components/layout/Content';
import css from '@styled-system/css';
import type { NextPage } from 'next';
import styled from 'styled-components';

const AccountsSection = styled.section(css({}));

const AccountsTitle = styled.h2(
  css({
    fontSize: 'large',
    fontWeight: 'semiBold',
    marginBottom: 4,
  }),
);

const Home: NextPage<{ cards: BankCardData[], monthlySavings: {bankAccountId: number, totalMonthlySavings: number}[], 
                      monthlySubscriptions: {bankAccountId: number, totalMonthlySubscriptions: number}[] }> = ({ cards, monthlySavings, monthlySubscriptions }) => {
  const totalBalance = cards.reduce((total, current) => total + current.balance, 0)
  const totalSavings = monthlySavings.reduce((total, current) => total + current.totalMonthlySavings, 0)
  const totalSubscriptions = monthlySubscriptions.reduce((total, current) => total + current.totalMonthlySubscriptions, 0)
  const totalEffectiveBalance = totalBalance - (totalSavings + totalSubscriptions)

  function calculateEffectiveBalance(pCard: BankCardData): number{
    const savings = monthlySavings.find((val)=> val.bankAccountId === pCard.id)?.totalMonthlySavings || 0
    const subscriptions = monthlySubscriptions.find((val)=> val.bankAccountId === pCard.id)?.totalMonthlySubscriptions || 0
    return pCard.balance - (savings + subscriptions)
  }

  return (
    <Content>
      <MoneyOverview marginBottom={10} balance={totalBalance} effectiveBalance={totalEffectiveBalance} savingAmount={totalSavings} subscriptionAmount={totalSubscriptions}/>
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
            effectiveBalance={calculateEffectiveBalance(card)}
          />
        ))}

        <AddAcountButton>Neues Konto</AddAcountButton>
      </AccountsSection>
    </Content>
  );
};

export async function getServerSideProps(context: any) {
  const cards: BankCardData[] = await (await fetch(`http://localhost:3000/api/cards`)).json()
  const monthlySavingsByCardResponses = await Promise.all(cards.map((card:BankCardData)=>{
    return fetch(`http://localhost:3000/api/monthlySavings/${card.id}`)
  }))
  const monthlySubscriptionsByCardResponses = await Promise.all(cards.map((card:BankCardData)=>{
    return fetch(`http://localhost:3000/api/totalSubscriptions/${card.id}`)
  }))

  console.log(monthlySubscriptionsByCardResponses.length);
  

  const SubscriptionResults: {bankAccountId: number, totalMonthlySubscriptions: number}[] = await Promise.all(monthlySubscriptionsByCardResponses.map((res)=>res.json()))
  const SavingResults: {bankAccountId: number, totalMonthlySavings: number}[] = await Promise.all(monthlySavingsByCardResponses.map((res)=>res.json()))
  
  return {
    props: { cards: cards, monthlySavings: SavingResults, monthlySubscriptions: SubscriptionResults},
  };
}



export default Home;
