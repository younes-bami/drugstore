import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types';

const DrugstoreMap = ({ userLocation, drugstores }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      // Check if the map is already initialized
      if (!mapRef.current) {
        // Initialize the map with a zoom level of 14 for a 3km radius
        mapRef.current = L.map('map').setView([userLocation.lat, userLocation.lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(mapRef.current);
      } else {
        // Update the map view with a zoom level of 13 for a 3km radius
        mapRef.current.setView([userLocation.lat, userLocation.lng], 15);
      }

      // Add a marker for the user's current location
      L.marker([userLocation.lat, userLocation.lng]).addTo(mapRef.current).bindPopup('You are here');

      // Custom icon for drugstore markers
      const drugstoreIcon = L.icon({
        iconUrl: 'https://png2.cleanpng.com/sh/a781734db37c12d5f3721ce29381d632/L0KzQYm3UsA1N5J7fZH0aYP2gLBuTgBpaaNyedVELYP8fbP2jL1kdJp1RdN7dD3kcrF5ifdqdpJxRdV1aYDkgsW0VfE4P2E8SKNuNki8coa1V8YxOGo9S6Q6NUG6R4a3UME4QWU5S5D5bne=/kisspng-pharmacy-symbol-clip-art-aboriginal-clipart-5a770701e689b5.7600983215177500179443.png', // Replace this URL with the actual URL of the green cross icon
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41]
      });

      // Add drugstores markers to map
      drugstores.forEach(drugstore => {
        if (drugstore.coordinates && drugstore.coordinates.latitude && drugstore.coordinates.longitude) {
          L.marker([drugstore.coordinates.latitude, drugstore.coordinates.longitude], { icon: drugstoreIcon }).addTo(mapRef.current).bindPopup(drugstore.name);
        }
      });
    }
  }, [userLocation, drugstores]);

  return <div id="map" style={{ height: '100%' }}></div>;
};

DrugstoreMap.propTypes = {
  userLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  drugstores: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
      name: PropTypes.string,
    })
  ).isRequired,
};

export default DrugstoreMap;
