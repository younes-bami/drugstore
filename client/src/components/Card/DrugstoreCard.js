import React from 'react';

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

export default DrugstoreCard;
