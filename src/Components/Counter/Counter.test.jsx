import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('renders Counter component', () => {
  render(<Counter />);

  // Check if initial count is zero
  const countElement = screen.getByTestId('count');
  expect(countElement).toHaveTextContent('0');
});

test('increments and decrements count', () => {
  render(<Counter />);

  const countElement = screen.getByTestId('count');
  const incrementButton = screen.getByText('Increment');
  const decrementButton = screen.getByText('Decrement');

  // Increment count
  fireEvent.click(incrementButton);
  expect(countElement).toHaveTextContent('1');

  // Decrement count
  fireEvent.click(decrementButton);
  expect(countElement).toHaveTextContent('0');
});
