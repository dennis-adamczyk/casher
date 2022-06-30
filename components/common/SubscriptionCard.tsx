import { getIntervalCaption } from '@/helpers/interval';
import { formatCurrency } from '@/helpers/formatter';
import { Bank_Account, Subscription } from '@prisma/client';
import css from '@styled-system/css';
import { FC } from 'react';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';

interface SubscriptionCardWrapperProps extends MarginProps {}

const SubscriptionCardWrapper = styled.article(
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'midnight.400',
    borderRadius: 'normal',
    padding: 3,
  }),
  margin,
);

const SubscriptionCardNameWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }),
);

const SubscriptionCardName = styled.h3(
  css({
    fontSize: 'large',
    fontWeight: 'medium',
  }),
);

const SubscriptionCardBankName = styled.p(
  css({
    fontSize: 'small',
    color: 'white.opacity.5',
    lineHeight: 'body',
  }),
);

const SubscriptionCardAmountWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 5,
  }),
);

interface SubscriptionCardAmountProps {
  positive?: boolean;
}

const SubscriptionCardAmount = styled.p<SubscriptionCardAmountProps>(({ positive }) =>
  css({
    fontWeight: 'medium',
    textAlign: 'right',
    lineHeight: 'body',
    color: positive ? 'blue.200' : 'white.default',
  }),
);

const SubscriptionCardAmountInterval = styled.p(
  css({
    fontSize: 'small',
    color: 'white.opacity.7',
    textAlign: 'right',
    lineHeight: 'body',
  }),
);

interface SubscriptionCardProps
  extends Pick<Subscription, 'name' | 'amount' | 'interval'>,
    Pick<Bank_Account, 'bank_name'>,
    SubscriptionCardWrapperProps {}

const SubscriptionCard: FC<SubscriptionCardProps> = ({ name, amount, interval, bank_name, ...props }) => {
  return (
    <SubscriptionCardWrapper {...props}>
      <SubscriptionCardNameWrapper>
        <SubscriptionCardName>{name}</SubscriptionCardName>
        <SubscriptionCardBankName>{bank_name}</SubscriptionCardBankName>
      </SubscriptionCardNameWrapper>
      <SubscriptionCardAmountWrapper>
        <SubscriptionCardAmount positive={amount > 0}>{formatCurrency(Math.abs(amount))}</SubscriptionCardAmount>
        <SubscriptionCardAmountInterval>{getIntervalCaption(interval)}</SubscriptionCardAmountInterval>
      </SubscriptionCardAmountWrapper>
    </SubscriptionCardWrapper>
  );
};

export default SubscriptionCard;
