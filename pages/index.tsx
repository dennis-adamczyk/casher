import AddAcountButton from '@/components/common/AddButton';
import BankCard, {  BankName } from '@/components/common/BankCard';
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

interface Card {
  id: number;
  bank: BankName;
  bankName: string;
  holder: string;
  iban: string;
  balance: number;
  effectiveBalance: number;
}

const Home: NextPage<{cards: Card[]}> = (props) => {
  let totalCash = 0
  let usableCash = 0

  props.cards.forEach((card: Card)=>{
    totalCash += card.balance
    usableCash += card.effectiveBalance
  })
  console.log(totalCash);
  console.log(usableCash);

  return (
    <Content>
      <MoneyOverview marginBottom={10} />
      <AccountsSection>
        <AccountsTitle>Deine Konten</AccountsTitle>
        { props.cards.map((card)=>(<BankCard
          key={card.id}
          bank={card.bank}
          bankName={card.bankName}
          holder={card.holder}
          iban={card.iban}
          balance={card.balance}
          effectiveBalance={card.effectiveBalance}
          />)) }

        <AddAcountButton>Neues Konto</AddAcountButton>
      </AccountsSection>
    </Content>
  );
};

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://localhost:3000/api/cards`)
  const data: Card[] = await res.json()
  return {
    props: {cards: data}, // will be passed to the page component as props
  }
}

export default Home;
