import userEvent from '@testing-library/user-event';

import App from './App';
import { render, screen, waitForElementToBeRemoved } from './test/test-utils';

test('should navigate to about page', async () => {
  render(<App />);

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  const aboutLink = screen.getByRole('link', { name: /about/i });

  userEvent.click(aboutLink);

  expect(screen.getByText(/about page/i));
});

test('landing on a not found page', () => {
  render(<App />, { route: '/some/bad/route' });

  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});
