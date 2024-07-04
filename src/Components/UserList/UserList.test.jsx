// UserList.test.js

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import UserList from './UserList';

// Mock the fetch function globally for all tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]),
  })
);

describe('UserList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders loading state initially', () => {
    render(<UserList />);

    // Assert that loading text is rendered initially
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders user list after data is fetched', async () => {
    render(<UserList />);

    // Wait for data to be fetched and loading state to be removed
    await waitFor(() => {
      // Assert that the loading text is not in the document
      const loadingElement = screen.queryByText(/Loading.../i);
      expect(loadingElement).not.toBeInTheDocument();

      // Assert that the user list is rendered
      const userListTitle = screen.getByText(/User List/i);
      expect(userListTitle).toBeInTheDocument();

      // Assert that individual users are rendered
      const userNames = screen.getAllByRole('listitem').map(li => li.textContent);
      expect(userNames).toEqual(['John Doe', 'Jane Smith']);
    });
  });
});
