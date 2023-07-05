import React from 'react';
import { render } from '@testing-library/react';
import DrugstoreCard from './DrugstoreCard';

test('renders drugstore information', () => {
  const drugstore = {
    name: 'Test Drugstore',
    address: '123 Test St',
    city: 'Test City',
    neighborhood: 'Test Neighborhood'
  };

  const { getByText } = render(<DrugstoreCard drugstore={drugstore} />);

  expect(getByText(drugstore.name)).toBeInTheDocument();
  expect(getByText(drugstore.address)).toBeInTheDocument();
  
  // Using a regular expression to match part of the text
  expect(getByText(/City:/i)).toBeInTheDocument();
  expect(getByText(/Neighborhood:/i)).toBeInTheDocument();
});
