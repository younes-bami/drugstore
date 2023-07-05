import React from 'react';
import { render } from '@testing-library/react';
import DrugstoreList from './DrugstoreList';

test('renders drugstore list', () => {
  const drugstores = [
    { name: 'Drugstore 1', address: 'Address 1', city: 'City 1', neighborhood: 'Neighborhood 1' },
    { name: 'Drugstore 2', address: 'Address 2', city: 'City 2', neighborhood: 'Neighborhood 2' }
  ];
  const { getByText } = render(<DrugstoreList drugstores={drugstores} />);
  expect(getByText('Drugstore 1')).toBeInTheDocument();
  expect(getByText('Address 1')).toBeInTheDocument();
});
