import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';

const theme = {
  color: {
    primaryTint: '#7300ff',
    primary: '#6200ee',
    error: '#b00020',
    grey: '#757575',
    white: '#ffffff',
    black: 'rgba(0,0,0,0.85)',
  },
  fontSize: {
    xs: '1.4rem',
    s: '1.6rem',
    m: '2rem',
    l: '2.4rem',
    xl: '3.6rem',
    xll: '4.2rem',
  },
  fontWeight: {
    regular: '400',
    semiBold: '500',
    bold: '700',
  },
  borderRadius: '.4rem',
  toast: {
    success: '#5cb85c',
    danger: '#d9534f',
    info: '#7300ff',
    warning: '#f0ad4e',
  },
};

const GlobalStyles = createGlobalStyle`
  *,*::after,*::before{
      box-sizing: border-box;
  }

  html{
      font-size:62.5%;
  }

  body{
      margin:0;
      font-size:1.6rem;
      font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
    display: inline-block;
  }

  button {
    display: inline-block;
    padding: 0;
    margin: 0;
    background: transparent;
    border: none;
    outline: none;
    box-shadow:transparent;
    font-family: inherit;
    font-size: ${theme.fontSize.xs};
    font-weight: ${theme.fontWeight.semiBold};
    letter-spacing: 1.25px;

    &:hover {
      cursor: pointer;
    }
  }

  button,
  input,
  textarea,
  input[type='submit'],
  input[type='search'],
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-decoration {
    border: none;
    outline: none;
    border: none;
    background: none;
    box-shadow: none;
  }
`;

export const ThemeProvider = ({ children }) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </StyledThemeProvider>
);
