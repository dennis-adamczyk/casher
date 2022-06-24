import css from '@styled-system/css';
import { FC } from 'react';
import styled, { keyframes, css as styledCss } from 'styled-components';
import { space, SpaceProps } from 'styled-system';

interface StyledProps extends SpaceProps {
  size: number;
  color: string;
  width: number;
}

const rotateAnimation = keyframes({
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const dashAnimation = keyframes({
  '0%': {
    strokeDasharray: '1, 200',
    strokeDashoffset: 0,
  },
  '50%': {
    strokeDasharray: '89,200',
    strokeDashoffset: -35,
  },
  '100%': {
    strokeDasharray: '89,200',
    strokeDashoffset: -124,
  },
});

const StyledCicle = styled.circle.attrs<Pick<StyledProps, 'width'>>(({ width }) => ({
  cx: 21 + width / 2,
  cy: 21 + width / 2,
  r: 20,
}))`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dashAnimation} 1.5s ease-in-out infinite 0s;
  stroke-linecap: round;
  fill: none;
`;

const StyledSvg = styled.svg.attrs<Pick<StyledProps, 'width'>>(({ width }) => ({
  viewBox: `0 0 ${42 + width} ${42 + width}`,
}))`
  animation: ${rotateAnimation} 1.5s linear infinite;
  height: 100%;
  width: 100%;
`;

const StyledSpinnerWrapper = styled.div<StyledProps>(
  ({ color, size, width }) =>
    css({
      width: size,
      height: size,
      color,

      [`${StyledCicle}`]: {
        strokeWidth: width,
        stroke: 'currentColor',
      },
    }),
  space,
);

const Spinner: FC<Partial<StyledProps> & { className?: string }> = ({
  color = 'white.default',
  size = 6,
  width = 4,
  ...props
}) => {
  return (
    <StyledSpinnerWrapper {...{ color, size, width, ...props }}>
      <StyledSvg {...{ width }}>
        <StyledCicle {...{ width }} />
      </StyledSvg>
    </StyledSpinnerWrapper>
  );
};

export default Spinner;
