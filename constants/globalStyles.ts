import css from '@styled-system/css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle(({ theme }) =>
  css({
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    },
    'html, body': {
      width: '100%',
      maxWidth: '100vw',
      overflow: 'initial',
      height: '100%',
      background: theme.colors.background.canvas,
      backgroundAttachment: 'fixed',
      color: 'text',
      fontSize: `${theme.sizeBase}px`,
    },
    '#__next': {
      height: '100%',
      fontFamily: [0],
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      letterSpacing: 'body',
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

export default GlobalStyle;
