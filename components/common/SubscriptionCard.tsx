import { getIntervalCaption } from '@/helpers/interval';
import { formatCurrency } from '@/helpers/formatter';
import { Subscription } from '@prisma/client';
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

const SubscriptionCardName = styled.h3(
  css({
    fontSize: 'large',
    fontWeight: 'medium',
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

const SubscriptionCardAmount = styled.p(
  css({
    fontWeight: 'medium',
    textAlign: 'right',
    lineHeight: 'body',
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
    SubscriptionCardWrapperProps {}

const SubscriptionCard: FC<SubscriptionCardProps> = ({ name, amount, interval, ...props }) => {
  return (
    <SubscriptionCardWrapper {...props}>
      <SubscriptionCardName>{name}</SubscriptionCardName>
      <SubscriptionCardAmountWrapper>
        <SubscriptionCardAmount>{formatCurrency(amount)}</SubscriptionCardAmount>
        <SubscriptionCardAmountInterval>{getIntervalCaption(interval)}</SubscriptionCardAmountInterval>
      </SubscriptionCardAmountWrapper>
    </SubscriptionCardWrapper>
  );
};

export default SubscriptionCard;
