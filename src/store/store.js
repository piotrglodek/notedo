import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
// redcuers
import authReducer from './reducers/authSlice';
import themeReducer from './reducers/themeSlice';

const store = configureStore({
  reducer: { auth: authReducer, theme: themeReducer },
});

export const StoreProvider = ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
);
