import { formatCurrency } from '@/helpers/formatter';
import { Goal } from '@prisma/client';
import css from '@styled-system/css';
import Link from 'next/link';
import { FC } from 'react';
import { ChevronRight } from 'react-feather';
import styled from 'styled-components';

interface GoalCardWrapperPros {
  backgroundColor?: string;
}

const GoalCardWrapper = styled.article<GoalCardWrapperPros>(({ backgroundColor = 'midnight.400' }) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: backgroundColor,
    borderRadius: 'normal',
    overflow: 'hidden',
    paddingX: 3,
    paddingY: 4,
    marginBottom: 4,
    position: 'relative',
    cursor: 'pointer',
  }),
);

const GoalCardContent = styled.div(
  css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 6,
    marginBottom: 3,
  }),
);

const GoalCardTextWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }),
);

const GoalCardName = styled.h3(
  css({
    fontSize: 'small',
    fontWeight: 'semiBold',
    lineHeight: 'body',
    textAlign: 'left',
    color: 'white.opacity.7',
  }),
);

const GoalCardAmountWrapper = styled.div(
  css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  }),
);

const GoalCardAmount = styled.p(
  css({
    fontSize: 5,
    fontWeight: 'semiBold',
    marginRight: 1,
  }),
);

const GoalCardTargetAmount = styled.p(
  css({
    fontSize: 'small',
    color: 'white.opacity.7',
  }),
);

const GoalCardEmojiWrapper = styled.div(
  css({
    display: 'grid',
    placeContent: 'center',
    backgroundColor: 'midnight.600',
    borderRadius: 'small',
    width: 8,
    height: 8,
    marginRight: 3,
  }),
);

const GoalCardEmojiIcon = styled.p(
  css({
    fontSize: 'text',
    color: 'white.default',
  }),
);

const GoalCardProgressBarWrapper = styled.div(
  css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderRadius: 'small',
    backgroundColor: 'white.opacity.1',
    height: 1,
    overflow: 'hidden',
  }),
);

interface GoalCardProgressBarProps {
  progress: number;
}

const GoalCardProgressBar = styled.div<GoalCardProgressBarProps>(({ progress }) =>
  css({
    width: `${progress * 100}%`,
    borderRadius: 'small',
    backgroundColor: 'blue.200',
  }),
);

const GoalCardIcon = styled(ChevronRight).attrs(({ theme }) => ({ color: theme.colors.white.opacity[7] }))(
  css({
    position: 'absolute',
    right: 3,
    top: '50%',
    transform: 'translateY(-50%)',
  }),
);

interface GoalCardProps
  extends Pick<Goal, 'name' | 'amount' | 'target_amount' | 'emojiIcon' | 'id'>,
    GoalCardWrapperPros {
  hideChevron?: boolean;
}

const GoalCard: FC<GoalCardProps> = ({ name, amount, target_amount, emojiIcon, id, hideChevron, ...props }) => {
  const progress = amount / target_amount;

  return (
    <Link href={`/goals/${id}`} passHref>
      <GoalCardWrapper {...props}>
        <GoalCardContent>
          <GoalCardEmojiWrapper>
            <GoalCardEmojiIcon>{emojiIcon}</GoalCardEmojiIcon>
          </GoalCardEmojiWrapper>
          <GoalCardTextWrapper>
            <GoalCardName>{name}</GoalCardName>
            <GoalCardAmountWrapper>
              <GoalCardAmount>{formatCurrency(amount)}</GoalCardAmount>
              <GoalCardTargetAmount>/ {formatCurrency(target_amount)}</GoalCardTargetAmount>
            </GoalCardAmountWrapper>
          </GoalCardTextWrapper>
        </GoalCardContent>
        <GoalCardProgressBarWrapper>
          <GoalCardProgressBar progress={progress} />
        </GoalCardProgressBarWrapper>
        {!hideChevron && <GoalCardIcon />}
      </GoalCardWrapper>
    </Link>
  );
};

export default GoalCard;
