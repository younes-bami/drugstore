import React from 'react';
import { render } from '@testing-library/react';
import DrugstoreMap from './DrugstoreMap';

test('renders the map container', () => {
  const { container } = render(<DrugstoreMap userLocation={null} drugstores={[]} />);
  const mapElement = container.querySelector('#map');
  expect(mapElement).toBeInTheDocument();
});
