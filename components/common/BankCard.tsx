import sparkasseLogo from '@/assets/img/sparkasseLogo.svg';
import volksbankLogo from '@/assets/img/volksbankLogo.svg';
import commerzbankLogo from '@/assets/img/commerzbankLogo.svg';
import { formatCurrency } from '@/helpers/formatter';
import css from '@styled-system/css';
import Image, { StaticImageData } from 'next/image';
import { rgba } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';

interface CardWrapperProps extends MarginProps {
  color?: string;
}

const CardWrapper = styled.div<CardWrapperProps>(
  ({ color }) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      aspectRatio: '1.6',
      backgroundColor: !color ? 'black.opacity.5' : rgba(color, 0.2),
      borderRadius: 'normal',
      overflow: 'hidden',
      padding: 4,
      marginBottom: 4,
    }),
  margin,
);

const CardUpperSection = styled.div(
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  }),
);

interface CardBankSectionProps {
  alignment: Bank['textAlignment'];
}

const CardBankSection = styled.div<CardBankSectionProps>(({ alignment }) =>
  css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: alignment === 'baseline' ? 'flex-end' : 'center',
  }),
);

const CardBankName = styled.p(
  css({
    fontSize: 1,
    color: 'body',
    lineHeight: '100%',
    marginLeft: 4,
    maxWidth: 12,
  }),
);

const CardMoneySection = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  }),
);

const CardBalanceItem = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 4,

    [`${CardMoneySection} &:last-child`]: {
      marginBottom: 0,
    },
  }),
);

const CardBalance = styled.p(
  css({
    fontSize: 'large',
    fontWeight: 'semiBold',
    textAlign: 'right',
  }),
);

const CardBalanceLabel = styled.p(
  css({
    fontSize: 'small',
    textAlign: 'right',
    color: 'white.opacity.7',
  }),
);

const CardBottomSection = styled.div(css({}));

const CardHolder = styled.p(
  css({
    fontWeight: 'medium',
    textTransform: 'uppercase',
    marginBottom: 2,
  }),
);

const CardIban = styled.p(
  css({
    fontSize: 1,
    textTransform: 'uppercase',
    color: 'gray.300',
  }),
);

type Bank = {
  name: string;
  color: string;
  logo: string | StaticImageData;
  textAlignment: 'baseline' | 'center';
};

const banks = {
  placeholder: {
    name: 'Placeholder',
    color: '#00ff62',
    logo: sparkasseLogo,
    textAlignment: 'baseline',
  } as Bank,
  sparkasse: {
    name: 'Sparkasse',
    color: '#FE0000',
    logo: sparkasseLogo,
    textAlignment: 'baseline',
  } as Bank,
  volksbank: {
    name: 'Volksbank',
    color: '#E16309',
    logo: volksbankLogo,
    textAlignment: 'baseline',
  } as Bank,
  commerzbank: {
    name: 'Commerzbank',
    color: '#949899',
    logo: commerzbankLogo,
    textAlignment: 'center',
  } as Bank,
};

export type BankName = keyof typeof banks;

interface BankCardData {
  id: number;
  bank: BankName;
  bankName?: string;
  holder: string;
  iban: string;
  balance: number;
  effectiveBalance: number;
}

interface BankCardProps
  extends Omit<BankCardData, 'balance' | 'effectiveBalance' | 'id'>,
    Pick<Partial<BankCardData>, 'balance' | 'effectiveBalance'>,
    MarginProps {}

const BankCard: FC<BankCardProps> = ({
  bank,
  bankName = banks[bank]?.name,
  holder,
  iban,
  balance,
  effectiveBalance,
  ...props
}) => {
  if (!Object.keys(banks).includes(bank))
    throw Error(`${bank} is not a valid bank because it has no bank information in BankCard component`);

  return (
    <CardWrapper {...props} color={banks[bank].color}>
      <CardUpperSection>
        <CardBankSection alignment={banks[bank].textAlignment}>
          <Image src={banks[bank].logo} alt={banks[bank].name} />
          <CardBankName>{bankName}</CardBankName>
        </CardBankSection>
        <CardMoneySection>
          {balance && (
            <CardBalanceItem>
              <CardBalance>{formatCurrency(balance)}</CardBalance>
              <CardBalanceLabel>Kontosatand</CardBalanceLabel>
            </CardBalanceItem>
          )}
          {effectiveBalance && (
            <CardBalanceItem>
              <CardBalance>{formatCurrency(effectiveBalance)}</CardBalance>
              <CardBalanceLabel>zur freien Verfügung</CardBalanceLabel>
            </CardBalanceItem>
          )}
        </CardMoneySection>
      </CardUpperSection>
      <CardBottomSection>
        <CardHolder>{holder}</CardHolder>
        <CardIban>{iban}</CardIban>
      </CardBottomSection>
    </CardWrapper>
  );
};

export default BankCard;
