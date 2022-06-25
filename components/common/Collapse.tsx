import css from '@styled-system/css';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';

interface CollapseWrapperProps extends MarginProps {
  maxHeight: number;
}

const CollapseWrapper = styled.section.attrs<CollapseWrapperProps>(({ maxHeight }) => ({
  style: {
    height: `${maxHeight}px`,
  },
}))<CollapseWrapperProps>(
  ({ theme }) =>
    css({
      overflow: 'hidden',
      transitionDuration: theme.transitions.duration.medium,
      transitionProperty: 'all',
      transitionTimingFunction: theme.transitions.timingFunction.normal,
    }),
  margin,
);

const CollapseHeader = styled.header(
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingY: 2,
  }),
);

const CollapseHeaderTitle = styled.h2(
  css({
    fontSize: 'large',
    fontWeight: 'semiBold',
  }),
);

interface CollapseIconProps {
  open?: boolean;
}

const CollapseIcon = styled(ChevronDown)<CollapseIconProps>(({ theme, open }) =>
  css({
    ...(open && {
      transform: 'rotate(180deg)',
    }),
    transitionDuration: theme.transitions.duration.medium,
    transitionProperty: 'transform',
    transitionTimingFunction: theme.transitions.timingFunction.normal,
  }),
);

const CollapseBody = styled.div(
  css({
    paddingTop: 2,
  }),
);

interface CollapseProps extends Omit<CollapseWrapperProps, 'maxHeight'> {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

const Collapse: FC<CollapseProps> = ({ children, title, defaultOpen = false, ...props }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [heights, setHeights] = useState({ close: 40, open: 40 });

  const collapseWrapper = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(
      collapseWrapper.current,
      collapseWrapper.current?.scrollHeight,
      header.current,
      header.current?.offsetHeight,
    );
    setHeights({
      open: collapseWrapper.current?.scrollHeight || 0,
      close: header.current?.offsetHeight || 0,
    });
  }, []);

  return (
    <CollapseWrapper {...props} ref={collapseWrapper} maxHeight={open ? heights.open : heights.close}>
      <CollapseHeader ref={header} onClick={() => setOpen((open) => !open)}>
        <CollapseHeaderTitle>{title}</CollapseHeaderTitle>
        <CollapseIcon open={open} />
      </CollapseHeader>
      <CollapseBody>{children}</CollapseBody>
    </CollapseWrapper>
  );
};

export default Collapse;
