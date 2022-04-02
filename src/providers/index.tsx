import { Store } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

type ProviderProps = {
  children: React.ReactNode;
  store: Store;
};

const Providers = ({ children, store }: ProviderProps) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

export default Providers;
