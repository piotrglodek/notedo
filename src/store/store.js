import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';

const store = configureStore({
  reducer: {},
});

export const StoreProvider = ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
);
