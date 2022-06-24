import css from '@styled-system/css';
import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';
import Spinner from './Loading/Spinner';

interface StyledButtonProps extends MarginProps {
  bg?: string;
  block?: boolean;
  disabled?: boolean;
  icon?: boolean;
  loading?: boolean;
}

const LoadingSpinner = <Spinner className="spinner" size={5} />;

const StyledContent = styled.span(({ theme }) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transitionProperty: 'opacity',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.timingFunction.normal,
  }),
);

const hoverColor = (color: string | undefined): string => {
  if (typeof color !== 'string') return '';

  const colorFragments = color.split('.');
  const colorValue = parseInt(colorFragments[colorFragments.length - 1], 10);
  if (colorValue === NaN) return color;
  if (colorValue >= 900 || colorValue < 100) return color;

  return colorFragments.reduce((acc, fragment, index) => {
    if (index <= 0) {
      return fragment;
    }

    if (index < colorFragments.length - 1) {
      return `${acc}.${fragment}`;
    }

    return `${acc}.${colorValue + 100}`;
  }, '');
};

const StyledButton = styled.button.withConfig<StyledButtonProps>({
  shouldForwardProp: (prop, defaultValidator) => defaultValidator(prop) && prop !== 'loading',
})(
  ({ theme, block, icon, loading, bg }) =>
    css({
      position: 'relative',
      display: block ? 'flex' : 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: bg || 'primary.500',
      border: 'none',
      minHeight: !icon ? 8 : 'initial',
      paddingX: icon ? 2 : 4,
      paddingY: icon ? 2 : 3,
      borderRadius: icon ? 'smaller' : 'normal',
      fontFamily: [0],
      fontSize: 'text',
      fontWeight: 'medium',
      textAlign: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      outline: 'none',
      outlineWidth: '0px',
      outlineOffset: '4px',
      transitionProperty: 'background, outline-offset',
      transitionDuration: theme.transitions.duration.extraShort,
      transitionTimingFunction: theme.transitions.timingFunction.normal,

      ...(icon
        ? {
            flexGrow: 0,
            flexShrink: 0,
          }
        : {}),

      '&:focus-visible': {
        outlineWidth: '1.5px',
        outlineOffset: '1.5px',
        outlineStyle: 'solid',
        outlineColor: 'primary.default',
      },

      i: {
        color: 'currentcolor',
      },

      [`${StyledContent}`]: {
        opacity: loading ? 0 : 1,
      },

      '.spinner': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'currentcolor',
      },

      '&:hover': {
        backgroundColor: hoverColor(bg) || 'primary.600',
      },
    }),
  margin,
  ({ disabled }) =>
    disabled &&
    css({
      backgroundColor: 'gray.800',
      pointerEvents: 'none',

      '&:hover': {
        backgroundColor: 'gray.800',
      },
    }),
);

interface IconWrapperProps {
  position: 'start' | 'end';
}

const IconWrapper = styled.span<IconWrapperProps>(({ position }) =>
  css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...(position === 'start' && { marginRight: 3 }),
    ...(position === 'end' && { marginLeft: 3 }),
  }),
);

const StyledLink = StyledButton.withComponent('a');

interface LinkOrButtonProps {
  children: ReactElement;
  href?: LinkProps['href'];
  linkProps?: Omit<LinkProps, 'href'>;
  loading?: boolean;
  props?: any;
}

const LinkOrButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkOrButtonProps>(
  ({ href, children, linkProps, loading, props }, ref) =>
    href ? (
      <Link href={href} {...linkProps} passHref>
        <StyledLink loading={loading} {...props} ref={ref}>
          {children}
        </StyledLink>
      </Link>
    ) : (
      <StyledButton loading={loading} {...props} ref={ref}>
        {children}
      </StyledButton>
    ),
);

LinkOrButton.displayName = 'LinkOrButton';

type CombinedLinkAndButtonProps = Partial<LinkProps> & ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>;

interface ButtonProps extends CombinedLinkAndButtonProps, StyledButtonProps {
  iconBefore?: ReactElement;
  iconAfter?: ReactElement;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      href,
      children,
      as,
      locale,
      passHref,
      prefetch,
      replace,
      scroll,
      shallow,
      iconBefore: startIcon,
      iconAfter: endIcon,
      loading,
      ...props
    },
    ref,
  ) => {
    return (
      <LinkOrButton
        {...{
          href,
          linkProps: {
            as,
            locale,
            passHref,
            prefetch,
            replace,
            scroll,
            shallow,
          },
          loading,
          props,
          ref,
        }}
      >
        <>
          <StyledContent>
            {startIcon && <IconWrapper position="start">{startIcon}</IconWrapper>}
            {children}
            {endIcon && <IconWrapper position="end">{endIcon}</IconWrapper>}
          </StyledContent>
          {loading && LoadingSpinner}
        </>
      </LinkOrButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
