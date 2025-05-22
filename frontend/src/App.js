import React, { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import HomePage from './components/HomePage';
// Quitamos la importación de ListingsPage
// import ListingsPage from './components/ListingsPage';
import RankingsPage from './components/RankingsPage';
import AddReviewPage from './components/AddReviewPage';

// No necesitamos mock data ni otros componentes por ahora
// import PropertyDetailPage from './components/PropertyDetailPage';
// import RegisterPage from './components/RegisterPage';
// import LoginPage from './components/LoginPage';
// import ForgotPasswordPage from './components/ForgotPasswordPage';
// import ProfilePage from './components/ProfilePage';
// import MyReviewsPage from './components/MyReviewsPage';
// import FavoritesPage from './components/FavoritesPage';
// import { currentUser } from './mock/users'; 
// import { reviews as initialReviewsData } from './mock/reviews'; 

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  // No necesitamos selectedPropertyId, isLoggedIn, registeredUsers, userReviews por ahora
  // const [selectedPropertyId, setSelectedPropertyId] = useState(1);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [registeredUsers, setRegisteredUsers] = useState([]); 
  // const [userReviews, setUserReviews] = useState([]); 


  // Quitamos las funciones de manejo de login, registro y reseñas por ahora
  // const handlePropertySelect = (propertyId) => { ... }
  // const handleLogin = (email, password) => { ... }
  // const handleLogout = () => { ... }
  // const handleRegister = (userData) => { ... }
  // const handleAddReview = (reviewData) => { ... }


  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      // Quitamos el caso para ListingsPage
      // case 'listings': return <ListingsPage setCurrentPage={setCurrentPage} onSelectProperty={handlePropertySelect} />;
      case 'rankings': 
        return <RankingsPage />; // No necesita props por ahora
      case 'addReview':
        // Pasamos una función placeholder para onAddReview
        return <AddReviewPage onAddReview={(data) => console.log('Review data:', data)} />; 
      // Quitamos los otros casos por ahora
      // case 'search': return <ListingsPage setCurrentPage={setCurrentPage} onSelectProperty={handlePropertySelect} />;
      // case 'propertyDetail': return <PropertyDetailPage propertyId={selectedPropertyId} setCurrentPage={setCurrentPage} />;
      // case 'register': return <RegisterPage setCurrentPage={setCurrentPage} onRegister={handleRegister} />;
      // case 'login': return <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} />;
      // case 'forgotPassword': return <ForgotPasswordPage setCurrentPage={setCurrentPage} />;
      // case 'registrationSuccess': return ( ... );
      // case 'reviewSubmitted': return <AddReviewPage initialStep={4} calculatedRating={...} />;
      // case 'profile': return <ProfilePage setCurrentPage={setCurrentPage} />;
      // case 'myReviews': return <MyReviewsPage setCurrentPage={setCurrentPage} userReviews={userReviews} />; 
      // case 'favorites': return <FavoritesPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Pasamos setCurrentPage al Header */}
      <LayoutHeader 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isLoggedIn={false} // Temporalmente false
        onLogout={() => {}} // Temporalmente placeholder
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <LayoutFooter />
    </div>
  );
};

export default App;