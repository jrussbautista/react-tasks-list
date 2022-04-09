import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { reducer } from 'app/store';
import Providers from 'providers';

// eslint-disable-next-line import/export
export const render = (
  ui: React.ReactElement,
  {
    route = '/',
    preloadedState,
    store = configureStore({ reducer, preloadedState }),
    ...renderOptions
  }: Record<string, any> = {}
) => {
  window.history.pushState({}, 'Test page', route);

  const Wrapper: React.FC = ({ children }) => {
    return <Providers store={store}>{children}</Providers>;
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';
export { userEvent, rtlRender };
