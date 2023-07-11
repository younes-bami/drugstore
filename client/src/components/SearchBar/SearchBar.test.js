import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('calls onSearchChange on user input', () => {
  const handleSearchChange = jest.fn();
  const { getByPlaceholderText } = render(<SearchBar onSearchChange={handleSearchChange} />);
  const input = getByPlaceholderText('Search by name, address, city, or neighborhood');

  fireEvent.change(input, { target: { value: 'test' } });

  expect(handleSearchChange).toHaveBeenCalled();
});
