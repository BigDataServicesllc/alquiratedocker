import React, { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import HomePage from './components/HomePage';
import RankingsPage from './components/RankingsPage';
import AddReviewPage from './components/AddReviewPage';
import LoginModal from './components/LoginModal';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'rankings':
        return <RankingsPage setCurrentPage={setCurrentPage} />;
      case 'addReview':
        return (
          <AddReviewPage
            setCurrentPage={setCurrentPage}
            onAddReview={(data) => console.log('Review data:', data)}
          />
        );
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <LayoutHeader
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setShowLoginModal={setShowLoginModal}
      />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <LayoutFooter />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default App;
