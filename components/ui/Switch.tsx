import css from '@styled-system/css';
import { FC, useId, useState } from 'react';
import styled from 'styled-components';

const SwitchWrapper = styled.label(
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    cursor: 'pointer',
    userSelect: 'none',
    marginBottom: 5,
  }),
);

interface SwitchLabelProps {
  active?: boolean;
}

const SwitchLabel = styled.span<SwitchLabelProps>(({ theme, active }) =>
  css({
    fontWeight: 'medium',
    color: active ? 'blue.200' : 'white.default',
    transitionDuration: theme.transitions.duration.short,
    transitionProperty: 'color',
    transitionTimingFunction: theme.transitions.timingFunction.normal,
  }),
);

const SwitchInput = styled.input(({ theme }) =>
  css({
    margin: 1,
    backgroundColor: 'midnight.400',
    width: 7,
    height: 4,
    borderRadius: 'normal',
    appearance: 'none',
    pointerEvents: 'none',
    touchAction: 'pan-y',
    border: 'none',
    outlineOffset: 1,
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    transitionDuration: theme.transitions.duration.short,
    transitionProperty: 'background',
    transitionTimingFunction: theme.transitions.timingFunction.normal,

    '&::before': {
      content: '""',
      cursor: 'pointer',
      pointerEvents: 'auto',
      gridArea: 'track',
      width: 5,
      height: 5,
      backgroundColor: 'blue.200',
      borderRadius: 'round',
      transform: 'translateX(-0.25rem)',
      transitionDuration: theme.transitions.duration.short,
      transitionProperty: 'transform',
      transitionTimingFunction: theme.transitions.timingFunction.normal,
    },

    '&:checked': {
      '&::before': {
        transform: 'translateX(calc(2.75rem - 100%))',
      },
    },
  }),
);

interface SwitchProps {
  label?: string | string[];
  onChange?: (value: boolean) => any;
  value?: boolean;
}

const Switch: FC<SwitchProps> = ({ label, onChange, value, ...props }) => {
  const id = useId();
  const [checkedState, setCheckedState] = useState(value || false);
  const [checked, setChecked] =
    value !== undefined ? [value, onChange || setCheckedState] : [checkedState, setCheckedState];

  return (
    <SwitchWrapper htmlFor={id} className="gui-switch">
      <SwitchLabel active={Array.isArray(label) && !checked}>{Array.isArray(label) ? label[0] : label}</SwitchLabel>
      <SwitchInput
        type="checkbox"
        role="switch"
        id={id}
        onChange={(event) => setChecked(event.target.checked)}
        checked={checked}
      />
      {Array.isArray(label) && <SwitchLabel active={checked}>{label[1]}</SwitchLabel>}
    </SwitchWrapper>
  );
};

export default Switch;
