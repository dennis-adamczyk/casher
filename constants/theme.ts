import { rgba } from 'polished';
import { DefaultTheme, StyleSystem } from 'styled-components';

// -----------------------------------------------------------
// Types
// -----------------------------------------------------------
declare module 'styled-components' {
  type ColorScale = {
    50?: Color;
    100: Color;
    200: Color;
    300: Color;
    400: Color;
    500: Color;
    600: Color;
    700: Color;
    800: Color;
    900: Color;
    950?: Color;
  };

  type Color = string;

  type ColorWithOpacity = {
    default: Color;
    opacity: {
      [opacity: string]: Color;
    };
  };

  export type StyleList<T> = Array<T> & Record<string, T>;

  export interface StyleSystem {
    colors: {
      white: ColorWithOpacity;
      black: ColorWithOpacity;
      gray: ColorScale;
      red: ColorWithOpacity;
      midnight: ColorScale;
      blue: ColorScale;
    };
    sizeBase: number;
    fontSizes: StyleList<string>;
    sizes: StyleList<string>;
    space: StyleList<string>;
    breakpoints: StyleList<string>;
    mediaQueries: { [size: string]: string };
    fonts: StyleList<string>;
    fontWeights: StyleList<number>;
    lineHeights: StyleList<number>;
    letterSpacings: StyleList<string>;
    borderWidths: StyleList<number>;
    borderStyles: StyleList<string>;
    radii: StyleList<string>;
    shadows: StyleList<string>;
    zIndices: StyleList<number>;
    transitions: {
      duration: StyleList<string>;
      timingFunction: StyleList<string>;
    };
  }

  type TextStyles = {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
    lineHeight?: number;
    color?: Color;
  };

  type SemanticColor = {
    default: Color;
    emphasis: Color;
  };

  export interface DefaultTheme extends StyleSystem {
    colors: StyleSystem['colors'] & {
      text: Color;
      body: Color;
      background: {
        base: Color;
        canvas: Color;
      };
      error: ColorWithOpacity;
      primary: ColorScale & SemanticColor;
    };
  }
}

// -----------------------------------------------------------
// Style System
// -----------------------------------------------------------

// Colors
const colors: StyleSystem['colors'] = {
  black: {
    default: '#000',
    opacity: {
      4: rgba('#000', 0.4),
      5: rgba('#000', 0.5),
      6: rgba('#000', 0.6),
      8: rgba('#000', 0.8),
    },
  },
  white: {
    default: '#FFF',
    opacity: {
      subtle8: rgba('#FFF', 0.08),
      1: rgba('#FFF', 0.1),
      7: rgba('#FFF', 0.7),
      9: rgba('#FFF', 0.9),
    },
  },
  gray: {
    50: '#FAFAFA',
    100: '#E6E6E6',
    200: '#CCCCCC',
    300: '#B3B3B3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4D4D4D',
    800: '#333333',
    900: '#1A1A1A',
    950: '#050505',
  },
  red: {
    default: '#FE4B4B',
    opacity: {
      1: rgba('#FE4B4B', 0.1),
    },
  },
  midnight: {
    100: '#5B6394',
    200: '#535A87',
    300: '#4B527A',
    400: '#43496E',
    500: '#3A3F5E',
    600: '#323652',
    700: '#2A2E45',
    800: '#232639',
    900: '#1A1C2B',
  },
  blue: {
    100: '#8A99FF',
    200: '#7083FF',
    300: '#5E72F5',
    400: '#5466DB',
    500: '#4B5BC3',
    600: '#414FA8',
    700: '#37438F',
    800: '#2D3775',
    900: '#232B5C',
  },
};

// Sizes
const sizeBase: StyleSystem['sizeBase'] = 16;

const remSize = (sizeInRem: number): string => `${sizeInRem}rem`;
const sizes = [
  remSize(0), // 0 - 0
  remSize(0.25), // 4 - 1
  remSize(0.5), // 8 - 2
  remSize(0.75), // 12 - 3
  remSize(1), // 16 - 4
  remSize(1.5), // 24 - 5
  remSize(2), // 32 - 6
  remSize(2.5), // 40 - 7
  remSize(3), // 48 - 8
  remSize(3.5), // 56 - 9
  remSize(4), // 64 - 10
  remSize(5), // 80 - 11
  remSize(6), // 96 - 12
  remSize(7), // 112 - 13
  remSize(8), // 128 - 14
] as StyleSystem['sizes'];

const breakpoints = ['600px', '905px'] as StyleSystem['breakpoints'];
[breakpoints.medium, breakpoints.large] = breakpoints;

const mediaQueries = {
  medium: `@media screen and (min-width: ${breakpoints.medium})`,
  large: `@media screen and (min-width: ${breakpoints.large})`,
} as StyleSystem['mediaQueries'];

const pxInRemSize = (sizeInPx: number): string => `${sizeInPx / sizeBase}rem`;
const fontSizes = [
  pxInRemSize(12),
  pxInRemSize(14),
  pxInRemSize(16),
  pxInRemSize(18),
  pxInRemSize(20),
  pxInRemSize(24),
  pxInRemSize(28),
  pxInRemSize(32),
  pxInRemSize(48),
] as StyleSystem['fontSizes'];

[fontSizes.small, , fontSizes.text, fontSizes.large] = fontSizes;

// Font

const fonts = ['Poppins, sans-serif'] as StyleSystem['fonts'];

const fontWeights = [200, 300, 400, 500, 600, 700] as StyleSystem['fontWeights'];

[fontWeights.thin, fontWeights.light, fontWeights.normal, fontWeights.medium, fontWeights.semiBold, fontWeights.bold] =
  fontWeights;

const lineHeights = [1.2, 1.4] as StyleSystem['lineHeights'];

[lineHeights.normal, lineHeights.body] = lineHeights;

const letterSpacings = ['0', '-0.01em', '0.03em'] as StyleSystem['letterSpacings'];

[letterSpacings.none, letterSpacings.body, letterSpacings.large] = letterSpacings;

// Border

const borderWidths = [0, 1] as StyleSystem['borderWidths'];

[, borderWidths.normal] = borderWidths;

const borderStyles = ['solid', 'dashed', 'dotted'] as StyleSystem['borderStyles'];

[borderStyles.normal, borderStyles.dashed, borderStyles.dotted] = borderStyles;

// Radii
const radii = [
  remSize(0),
  remSize(0.125),
  remSize(0.5),
  remSize(0.75),
  remSize(1),
  remSize(2),
  '50%',
] as StyleSystem['radii'];

[, radii.thin, radii.small, radii.smaller, radii.normal, radii.large, radii.round] = radii;

// Shadow
const shadows = ['none'] as StyleSystem['shadows'];

// Z Indices
const zIndices = new Array<number>() as StyleSystem['zIndices'];

// Transitions
const transitions = {
  duration: ['80ms', '130ms', '180ms', '200ms', '250ms'],
  timingFunction: ['ease', 'ease-in', 'ease-out'],
} as StyleSystem['transitions'];

[
  transitions.duration.extraShort,
  transitions.duration.short,
  transitions.duration.medium,
  transitions.duration.longer,
  transitions.duration.long,
] = transitions.duration;

[transitions.timingFunction.normal, transitions.timingFunction.in, transitions.timingFunction.out] =
  transitions.timingFunction;

// Construct Style System
const styleSystem: StyleSystem = {
  colors,
  sizeBase,
  fontSizes,
  sizes,
  space: sizes,
  breakpoints,
  mediaQueries,
  fonts,
  fontWeights,
  lineHeights,
  letterSpacings,
  borderWidths,
  borderStyles,
  radii,
  shadows,
  zIndices,
  transitions,
};

// -----------------------------------------------------------
// Themes
// -----------------------------------------------------------

const theme: DefaultTheme = {
  ...styleSystem,
  colors: {
    ...styleSystem.colors,
    text: styleSystem.colors.white.default,
    body: styleSystem.colors.gray[900],
    primary: {
      ...styleSystem.colors.blue,
      default: styleSystem.colors.blue[500],
      emphasis: styleSystem.colors.blue[600],
    },
    background: {
      base: styleSystem.colors.midnight[500],
      canvas: `radial-gradient(54.49% 78.15% at 50% 9.86%, ${styleSystem.colors.midnight[500]} 0%, ${styleSystem.colors.midnight[800]} 100%)`,
    },
    error: styleSystem.colors.red,
  },
};

export default theme;
