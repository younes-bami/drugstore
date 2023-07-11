import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types';
import axios from 'axios';

const DrugstoreMap = ({ userLocation, setDrugstores, drugstores }) => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState(userLocation);
  const [mapRadius, setMapRadius] = useState(2); // Default radius in km

  const fetchDrugstores = useCallback((center, radius) => {
    axios.get(`http://localhost:3001/api/drugstores?lat=${center.lat}&lng=${center.lng}&radius=${radius}`)
    .then(response => {
        // Update the state with the new data
        setDrugstores(response.data);
      })
      .catch(error => {
        // Handle the error here
        console.error(error);
      });
  }, [setDrugstores]);

  useEffect(() => {
    if (mapCenter && mapCenter.lat && mapCenter.lng) {
      // Check if the map is already initialized
      if (!mapRef.current) {
        // Initialize the map with a zoom level of 15 for a 2km radius
        mapRef.current = L.map('map').setView([mapCenter.lat, mapCenter.lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(mapRef.current);

        // Add event listener for when the user finishes panning/zooming
        mapRef.current.on('moveend', () => {
          const center = mapRef.current.getCenter();
          const bounds = mapRef.current.getBounds();
          const edgePoint = new L.LatLng(center.lat, bounds.getEast());
          const radius = center.distanceTo(edgePoint) / 1000; // Convert to km
          setMapCenter(center);
          setMapRadius(radius);
          fetchDrugstores(center, radius);
        });

        // Perform an initial fetch of drugstores
        fetchDrugstores(mapCenter, mapRadius);
      }
    }
  }, [mapCenter, fetchDrugstores, mapRadius]);

  useEffect(() => {
    if (mapRef.current && drugstores) {
      // Custom icon for drugstore markers
      const drugstoreIcon = L.icon({
        iconUrl: 'https://png2.cleanpng.com/sh/a781734db37c12d5f3721ce29381d632/L0KzQYm3UsA1N5J7fZH0aYP2gLBuTgBpaaNyedVELYP8fbP2jL1kdJp1RdN7dD3kcrF5ifdqdpJxRdV1aYDkgsW0VfE4P2E8SKNuNki8coa1V8YxOGo9S6Q6NUG6R4a3UME4QWU5S5D5bne=/kisspng-pharmacy-symbol-clip-art-aboriginal-clipart-5a770701e689b5.7600983215177500179443.png', // Replace this URL with the actual URL of the icon
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41]
      });

      // Clear existing markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Add a marker for the user's current location
      L.marker([userLocation.lat, userLocation.lng]).addTo(mapRef.current).bindPopup('You are here');

      // Add drugstores markers to map
      drugstores.forEach(drugstore => {
        if (drugstore.coordinates && drugstore.coordinates.latitude && drugstore.coordinates.longitude) {
          L.marker([drugstore.coordinates.latitude, drugstore.coordinates.longitude], { icon: drugstoreIcon }).addTo(mapRef.current).bindPopup(drugstore.name);
        }
      });
    }
  }, [drugstores, userLocation]);

  console.log(`Map radius: ${mapRadius} km`);

  return <div id='map' style={{ height: '100%' }}></div>;
};

DrugstoreMap.propTypes = {
  userLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  setDrugstores: PropTypes.func.isRequired,
  drugstores: PropTypes.array,
};

export default DrugstoreMap;
