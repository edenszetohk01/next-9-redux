import { isIE } from 'react-device-detect'

const theme = {
  colors: {
    // example: torchRed: '#f5222d',
  },
  transitions: {
    basic: 'all 0.3s, padding 0s',
  },
  palette: {
    mainTheme: '#1745ef',
    skeleton: '#f6f6f6',
  },
  breakpoints: ['320px', '600px', '1008px', '1280px'],
  fontSizes: ['14px', '18px', '22px'],
  isIE: isIE,
}

export default theme
