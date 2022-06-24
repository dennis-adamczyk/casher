import BankCard from '@/components/common/BankCard';
import MoneyOverview from '@/components/common/MoneyOverview';
import Content from '@/components/layout/Content';
import Button from '@/components/ui/Button';
import css from '@styled-system/css';
import type { NextPage } from 'next';
import { Plus } from 'react-feather';
import styled from 'styled-components';

const AccountsSection = styled.section(css({}));

const AddAcountButton = styled(Button).attrs({ bg: 'midnight.500', iconBefore: <Plus />, block: true })(
  css({
    marginTop: 5,
    marginX: 'auto',
  }),
);

const AccountsTitle = styled.h2(
  css({
    fontSize: 'large',
    fontWeight: 'semiBold',
    marginBottom: 4,
  }),
);

const Home: NextPage = () => {
  return (
    <Content>
      <MoneyOverview marginBottom={10} />
      <AccountsSection>
        <AccountsTitle>Deine Konten</AccountsTitle>
        <BankCard
          bank="sparkasse"
          bankName="Sparkasse Duisburg"
          holder="Max Mustermann"
          iban="DE99 1234 5678 1234 5678 90"
          balance={5239.34}
          effectiveBalance={4907.75}
        />
        <BankCard
          bank="volksbank"
          bankName="Volksbank Niederrhein"
          holder="Max Mustermann"
          iban="DE99 1234 5678 1234 5678 90"
          balance={5239.34}
          effectiveBalance={4907.75}
        />
        <BankCard
          bank="commerzbank"
          holder="Max Mustermann"
          iban="DE99 1234 5678 1234 5678 90"
          balance={5239.34}
          effectiveBalance={4907.75}
        />
        <AddAcountButton>Neues Konto</AddAcountButton>
      </AccountsSection>
    </Content>
  );
};

export default Home;
