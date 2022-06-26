import css from '@styled-system/css';
import { FC, InputHTMLAttributes, useId } from 'react';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';

interface InputSetWrapperProps extends MarginProps {}

const InputSetWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 5,
  }),
  margin,
);

const InputLabel = styled.label(
  css({
    fontSize: 'small',
    color: 'white.opacity.7',
    marginLeft: 3,
    marginBottom: 2,
  }),
);

const InputWrapper = styled.div(({ theme }) =>
  css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 'smaller',
    borderWidth: 'normal',
    borderColor: 'white.default',
    borderStyle: 'normal',
    backgroundColor: 'white.opacity.subtle8',
    height: 8,
    transitionDuration: theme.transitions.duration.short,
    transitionProperty: 'border',
    transitionTimingFunction: theme.transitions.timingFunction.normal,

    '&:focus-within': {
      borderColor: 'blue.200',
    },
  }),
);

const StyledInput = styled.input(
  css({
    flexGrow: 1,
    height: '100%',
    color: 'text',
    fontFamily: '0',
    fontSize: 'text',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    padding: 3,
  }),
);

const InputSuffix = styled.p(
  css({
    textAlign: 'right',
    margin: 0,
    marginLeft: 4,
    marginRight: 3,
  }),
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, InputSetWrapperProps {
  label: string;
  suffix?: string;
}

const Input: FC<InputProps> = ({ label, suffix, ...props }) => {
  const id = useId();
  const {
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    m,
    mb,
    ml,
    mr,
    mt,
    mx,
    my,
    ...rest
  } = props;

  return (
    <InputSetWrapper
      {...{ margin, marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, m, mb, ml, mr, mt, mx, my }}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputWrapper>
        <StyledInput {...rest} id={id} />
        {suffix && <InputSuffix>{suffix}</InputSuffix>}
      </InputWrapper>
    </InputSetWrapper>
  );
};

export default Input;
