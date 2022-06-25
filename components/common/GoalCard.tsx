import css from '@styled-system/css';
import { FC, ReactNode } from 'react';
import { ChevronRight } from 'react-feather';
import styled from 'styled-components';
import Button from '../ui/Button';

const GoalCardWrapper = styled.article(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'midnight.400',
    borderRadius: 'normal',
    overflow: 'hidden',
    mb: "20px",
  }),
);

const GoalCardContent = styled.div(
  css({
    paddingX: 3,
    paddingTop: 4,
  }),
);

const GoalCardHeader = styled.div(
  css({
    marginBottom: 5,
  }),
);

const GoalCardName = styled.h3(
  css({
    fontSize: 'text',
    fontWeight: 'semiBold',
    textAlign: 'left',
  }),
);

const GoalCardAmount = styled.p(
  css({
    fontSize: 'small',
    color: 'white.opacity.7',
    marginTop: 1,
  }),
);

const GoalCardTargetAmount = styled.p(
    css({
      fontSize: 'small',
      color: 'white.opacity.7',
      marginTop: 1,
    }),
  );

const GoalCardEmojiIcon = styled.p(
    css({
        fontSize: 'small',
        color: 'white.opacity.7',
        marginTop: 1,
    }),
);

const GoalCardProgressBar = styled.div(
    css({}),
);

interface GoalCardProps {
  name: string;
  subtitle?: string;
}

const GoalCard: FC<GoalCardProps> = ({ name, subtitle}) => {
  return (
    <GoalCardWrapper>
      <GoalCardContent>
        <GoalCardHeader>
          <GoalCardName>{name}</GoalCardName>
        </GoalCardHeader>
      </GoalCardContent>
    </GoalCardWrapper>
  );
};

export default GoalCard;
