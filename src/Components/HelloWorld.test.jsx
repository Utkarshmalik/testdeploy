import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from './Helloworld';

test('renders Hello, World!', () => {
  render(<HelloWorld />);
  expect(screen.getByText('Hello, World!')).toBeInTheDocument();
});
