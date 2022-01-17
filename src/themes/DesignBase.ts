import { Theme } from 'theme-ui';

/* 
This theme is for shared design properties.
 */

const DesignBase: Theme = {
  breakpoints: ['250px', '500px', '700px', '1000px', '1300px', '1650px'],
  // breakpoints: ['40em', '52em', '64em'],
  colors: {
    required: 'white',
    text: '#4a4a4a',
    background: '#f4f4f4',
    white: '#fff',
    primary: '#07c',
    secondary: '#6c757d',
    warning: '#ffc107',
    danger: '#dc3545',
    accent: '#609',
    muted: '#999',
    disabled: '#efefef',
    grey: '#777',
    lightGrey: '#efefef',
    outlineColor: '#3191FF',
    darkBlue: '#004085',
    lightBlue: '#cce5ff',
    gridRowHighlight: '#B3D8FF',
    scrollbarFront: 'rgb(156, 156, 156)',
    scrollbarBack: 'rgb(206, 206, 206)',
    lightBorder: 'hsl(0, 12%, 93%)',
    darkBorder: 'hsl(247, 98%, 10%)',
    sysMessageNotificationBg: '#fff3cd',
    sysExceptionNotificationBg: '#f8d7da',
  },
  fonts: {
    body: '"Public Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64],
  fontWeights: {
    light: 300,
    body: 400,
    heading: 600,
    bold: 600,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: '0.01em',
    mono: '0.07em',
    faux: '0.05em',
    heading: '-0.015em',
    smallcaps: '0.07em',
  },
  radii: {
    default: 0,
    circle: 99999,
  },
  shadows: {},
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    root: '992px',
    admin: '1280px',
  },
};

export default DesignBase;
