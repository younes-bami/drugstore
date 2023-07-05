import React from 'react';
import PropTypes from 'prop-types';

const DrugstoreCard = ({ drugstore }) => {
  return (
    <div className="drugstore-card">
      <div>
        <div>{drugstore.name}</div>
        <div>{drugstore.address}</div>
        <div>
          <strong>City:</strong> {drugstore.city}
          <br />
          <strong>Neighborhood:</strong> {drugstore.neighborhood}
        </div>
      </div>
    </div>
  );
};

DrugstoreCard.propTypes = {
  drugstore: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    neighborhood: PropTypes.string,
  }).isRequired,
};

export default DrugstoreCard;
