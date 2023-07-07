// App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrugstoreList from './components/ListView/DrugstoreList';
import DrugstoreMap from './components/MapView/DrugstoreMap';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchDrugstores } from './redux/actions/drugstoreActions';
import './styles/app.css';
import ErrorBoundary from './components/ErrorBoundary';
import useUserLocation from './hooks/useUserLocation';

const App = () => {
  const dispatch = useDispatch();
  const drugstores = useSelector((state) => state.drugstores.drugstores);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDrugstores, setFilteredDrugstores] = useState([]);
  const { location: userLocation, error: locationError } = useUserLocation();

  useEffect(() => {

    if (userLocation && userLocation.lat && userLocation.lng) {
      dispatch(fetchDrugstores(userLocation.lat,userLocation.lng));
    }
  }, [dispatch, userLocation]);
  

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
          {userLocation && <DrugstoreMap userLocation={userLocation} drugstores={filteredDrugstores} />}
          <DrugstoreList drugstores={filteredDrugstores} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
