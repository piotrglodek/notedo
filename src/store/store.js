import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
// redcuers
import authReducer from './reducers/authSlice';

const store = configureStore({
  reducer: { auth: authReducer },
});

export const StoreProvider = ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
);
