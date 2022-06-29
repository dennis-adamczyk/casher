import css from '@styled-system/css';
import { FC, forwardRef, useId } from 'react';
import styled, { useTheme } from 'styled-components';
import { margin, MarginProps } from 'styled-system';
import ReactSelect, { StylesConfig, components, DropdownIndicatorProps, Props as ReactSelectProps } from 'react-select';
import { ChevronDown } from 'react-feather';

interface SelectSetWrapperProps extends MarginProps {}

const SelectSetWrapper = styled.div(
  css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 5,
  }),
  margin,
);

const SelectLabel = styled.label(
  css({
    fontSize: 'small',
    color: 'white.opacity.7',
    marginLeft: 3,
    marginBottom: 2,
  }),
);

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown size={16} color="#fff" />
    </components.DropdownIndicator>
  );
};

export type Option = { value: number | string; label: string };

interface SelectProps extends ReactSelectProps<Option>, SelectSetWrapperProps {
  label?: string;
}

const Select = forwardRef<any, SelectProps>(({ label, ...props }, ref) => {
  const id = useId();
  const theme = useTheme();
  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      background: theme.colors.white.opacity.subtle8,
      borderRadius: theme.radii.smaller,
      borderColor: theme.colors.white.default,
      height: theme.sizes[8],
      transitionDuration: theme.transitions.duration.short,
      transitionProperty: 'border',
      transitionTimingFunction: theme.transitions.timingFunction.normal,
      outline: 'none',
      boxShadow: 'none',

      '&:hover': {
        borderColor: theme.colors.blue[200],
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: `${theme.sizes[0]} ${theme.sizes[3]}`,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme.colors.white.opacity[7],
      margin: 0,
    }),
    input: (provided) => ({
      ...provided,
      color: theme.colors.text,
      margin: 0,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: `${theme.sizes[0]} ${theme.sizes[3]} ${theme.sizes[0]} ${theme.sizes[0]}`,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme.colors.text,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.colors.midnight[500],
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? theme.colors.midnight[700] : theme.colors.midnight[500],
      fontWeight: state.isSelected ? theme.fontWeights.semiBold : theme.fontWeights.normal,
    }),
  };
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
    <SelectSetWrapper
      {...{ margin, marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, m, mb, ml, mr, mt, mx, my }}
    >
      <SelectLabel htmlFor={id}>{label}</SelectLabel>

      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore */}
      <ReactSelect
        {...rest}
        isSearchable={false}
        placeholder="Auswählen..."
        components={{ DropdownIndicator }}
        styles={customStyles}
        id={id}
        ref={ref}
      />
    </SelectSetWrapper>
  );
});

Select.displayName = 'Select';

export default Select;
