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

const Home: NextPage<{ cards: BankCardData[] }> = ({ cards }) => {
  const totalBalance = cards.reduce((total, current) => total + current.balance, 0);
  const totalEffectiveBalance = cards.reduce((total, current) => total + current.effectiveBalance, 0);

  return (
    <Content>
      <MoneyOverview marginBottom={10} balance={totalBalance} effectiveBalance={totalEffectiveBalance} />
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
  const res = await fetch(`http://localhost:3000/api/cards`);
  const data: BankCardData[] = await res.json();
  return {
    props: { cards: data }, // will be passed to the page component as props
  };
}

export default Home;
