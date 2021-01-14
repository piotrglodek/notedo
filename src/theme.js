import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
// redux for ThemeProvider
import { useSelector } from 'react-redux';
import { selectTheme } from './store/reducers/themeSlice';

const lightTheme = {
  color: {
    primaryTint: '#7300FF',
    primary: '#6200EE',
    error: '#B00020',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    onPrimary: '#FFFFFF',
    onBackground: '#262626',
    onSurface: '#262626',
    gray: '#B3B3B3',
    grayShade: '#A3A3A3',
  },
  toast: {
    success: '#5cb85c',
    danger: '#d9534f',
    info: '#7300ff',
    warning: '#f0ad4e',
  },
};

const darkTheme = {
  color: {
    primaryTint: '#D0B3FA',
    primary: '#B180F7',
    error: '#D88090',
    background: '#212121',
    surface: '#303030',
    onPrimary: '#272727',
    onBackground: '#f3f3f3',
    onSurface: '#f3f3f3',
    gray: '#D9D9D9',
    grayShade: '#BEBEBE',
  },
  toast: {
    success: '#AEDCAE',
    danger: '#ECA9A7',
    info: '#B980FF',
    warning: '#F8D6A7',
  },
};

const pinkTheme = {
  color: {
    primaryTint: '#FFADB8',
    primary: '#FF8A99',
    error: '#B00020',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    onPrimary: '#272727',
    onBackground: '#FF8A99',
    onSurface: '#272727',
    gray: '#FFADB8',
    grayShade: '#FF9CA8',
  },
  toast: {
    success: '#5cb85c',
    danger: '#d9534f',
    info: '#7300ff',
    warning: '#f0ad4e',
  },
};

const theme = {
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
      color:${({ theme: { color } }) => color.onBackground};
      background-color:${({ theme: { color } }) => color.background};
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

export const ThemeProvider = ({ children }) => {
  const themeMode = useSelector(selectTheme);
  const currentTheme =
    themeMode === 'light'
      ? Object.assign({}, theme, lightTheme)
      : themeMode === 'dark'
      ? Object.assign({}, theme, darkTheme)
      : Object.assign({}, theme, pinkTheme);
  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};
