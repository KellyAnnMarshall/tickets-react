import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

it('renders the tickets and filters them case-insensitively', () => {
  const { container } = render(<App />);
  const search = screen.getByRole('textbox', { name: 'Search Tickets' });

  expect(container.querySelectorAll('.ticket')).toHaveLength(28);

  fireEvent.change(search, { target: { value: 'jImMy cLiFf' } });

  expect(screen.getByText('Jimmy Cliff')).toBeTruthy();
  expect(container.querySelectorAll('.ticket')).toHaveLength(1);
  expect(screen.queryByText('The Cure')).toBeNull();

  fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

  expect(search.value).toBe('');
  expect(container.querySelectorAll('.ticket')).toHaveLength(28);
  expect(screen.getAllByText('The Cure')).toHaveLength(2);
});
