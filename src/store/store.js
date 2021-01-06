import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
// redcuers
import appReducer from './reducers/app';

const store = configureStore({
  reducer: { app: appReducer },
});

export const StoreProvider = ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
);
