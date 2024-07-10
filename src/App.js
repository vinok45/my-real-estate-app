// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import PropertyList from './components/PropertyList';
import SearchBar from './components/SearchBar';
import PropertyDetail from './components/PropertyDetail';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Modal from './components/Modal';
import Pagination from './components/Pagination';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProperty from './components/AddProperty';
import EditProperty from './components/EditProperty';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [minSize, setMinSize] = useState('');
  const [maxSize, setMaxSize] = useState('');
  const [type, setType] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(5);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  useEffect(() => {
    const fetchProperties = async () => {
      const query = new URLSearchParams({
        title: searchQuery,
        minPrice,
        maxPrice,
        location,
        minSize,
        maxSize,
        type
      }).toString();

      const response = await fetch(`/properties?${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        setNotification({ message: 'Erreur de chargement des données', type: 'error' });
      }
    };

    if (token) {
      fetchProperties();
    }
  }, [token, searchQuery, minPrice, maxPrice, location, minSize, maxSize, type]);

  const filteredProperties = properties.filter(property => {
    return property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (minPrice === '' || property.price >= parseInt(minPrice)) &&
      (maxPrice === '' || property.price <= parseInt(maxPrice));
  });

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(filteredProperties.length / propertiesPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const confirmDeleteProperty = (id) => {
    setIsModalOpen(true);
    setPropertyToDelete(id);
  };

  const deleteProperty = async (id) => {
    try {
      await fetch(`/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(properties.filter(property => property.id !== id));
      setNotification({ message: 'Propriété supprimée avec succès', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Erreur lors de la suppression de la propriété', type: 'error' });
    }
    setIsModalOpen(false);
  };

  const addToFavorites = async (propertyId) => {
    try {
      await fetch('/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ propertyId, userId })
      });
      setNotification({ message: 'Propriété ajoutée aux favoris', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Erreur lors de l\'ajout aux favoris', type: 'error' });
    }
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className="App">
          <NavBar token={token} setToken={setToken} />
          <Notification message={notification.message} type={notification.type} setNotification={setNotification} />
          <Modal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            confirmAction={() => deleteProperty(propertyToDelete)}
            message="Êtes-vous sûr de vouloir supprimer cette propriété ?"
          />
          <h1>Biens Immobiliers</h1>
          <Routes>
            <Route path="/" element={
              <>
                <SearchBar
                  setSearchQuery={setSearchQuery}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  setLocation={setLocation}
                  setMinSize={setMinSize}
                  setMaxSize={setMaxSize}
                  setType={setType}
                />
                <PropertyList properties={currentProperties} deleteProperty={confirmDeleteProperty} addToFavorites={addToFavorites} />
                <Pagination
                  propertiesPerPage={propertiesPerPage}
                  totalProperties={filteredProperties.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </>
            } />
            <Route path="/property/:id" element={<PropertyDetail properties={properties} />} />
            <Route path="/add-property" element={
              <PrivateRoute token={token}>
                <AddProperty setProperties={setProperties} setNotification={setNotification} />
              </PrivateRoute>
            } />
            <Route path="/edit-property/:id" element={
              <PrivateRoute token={token}>
                <EditProperty properties={properties} setProperties={setProperties} setNotification={setNotification} />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} setNotification={setNotification} />} />
            <Route path="/register" element={<Register setNotification={setNotification} />} />
            <Route path="/profile" element={
              <PrivateRoute token={token}>
                <UserProfile token={token} setNotification={setNotification} />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
