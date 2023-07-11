import React, { useEffect, useState } from 'react';
import DrugstoreList from './components/ListView/DrugstoreList';
import DrugstoreMap from './components/MapView/DrugstoreMap';
import SearchBar from './components/SearchBar/SearchBar';
import './styles/app.css';
import ErrorBoundary from './components/ErrorBoundary';
import useUserLocation from './hooks/useUserLocation';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drugstores, setDrugstores] = useState([]);
  const [filteredDrugstores, setFilteredDrugstores] = useState([]);
  const { location: userLocation, error: locationError } = useUserLocation();

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = drugstores.filter((drugstore) =>
      drugstore.name?.toLowerCase().includes(query) ||
      drugstore.address?.toLowerCase().includes(query) ||
      drugstore.city?.toLowerCase().includes(query) ||
      drugstore.neighborhood?.toLowerCase().includes(query)
    );
    setFilteredDrugstores(filtered);
  }, [searchQuery, drugstores]);

  return (
    <div className="App">
      <ErrorBoundary>
        <SearchBar onSearchChange={(query) => setSearchQuery(query)} />
        {locationError && <div className="error">{locationError}</div>}
        <div className="content-row">
          {userLocation && <DrugstoreMap userLocation={userLocation} setDrugstores={setDrugstores} drugstores={drugstores} />}
          <DrugstoreList drugstores={filteredDrugstores} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
