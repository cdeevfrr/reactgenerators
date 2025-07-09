import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const startingMoney = screen.getByText(/Starting money/i);
  expect(startingMoney).toBeInTheDocument();
});
