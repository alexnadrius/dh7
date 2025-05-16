// Адаптированный App.jsx с автологином и тестовой сделкой
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DealList from './components/DealList';
import Chat from './components/Chat';

const App = () => {
  const [deals, setDeals] = useState([]);
  const [currentUserPhone, setCurrentUserPhone] = useState('');

  useEffect(() => {
    const storedDeals = localStorage.getItem('deals');
    const storedUser = localStorage.getItem('currentUserPhone');

    // Автологин на "test"
    if (!storedUser) {
      setCurrentUserPhone('test');
      localStorage.setItem('currentUserPhone', 'test');
    } else {
      setCurrentUserPhone(storedUser);
    }

    // Если сделок нет — создаём одну тестовую
    if (!storedDeals || JSON.parse(storedDeals).length === 0) {
      const initialDeal = {
        id: Date.now(),
        name: 'Тестовая сделка',
        amount: 1000,
        currency: '$',
        stageIndex: 0,
        messages: [],
        transfer: 0,
        buyerPhone: 'test',
        supplierPhone: 'test',
        createdBy: 'test',
      };
      setDeals([initialDeal]);
      localStorage.setItem('deals', JSON.stringify([initialDeal]));
    } else {
      setDeals(JSON.parse(storedDeals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('deals', JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    if (currentUserPhone) {
      localStorage.setItem('currentUserPhone', currentUserPhone);
    }
  }, [currentUserPhone]);

  const addDeal = (newDeal) => {
    setDeals((prev) => [...prev, newDeal]);
  };

  const updateDeal = (updatedDeal) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === updatedDeal.id ? updatedDeal : d))
    );
  };

  const deleteDeal = (id) => {
    const updated = deals.filter((d) => d.id !== id);
    setDeals(updated);
    localStorage.setItem('deals', JSON.stringify(updated));
  };

  const reorderDeals = (newOrder) => {
    setDeals(newOrder);
    localStorage.setItem('deals', JSON.stringify(newOrder));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header currentUserPhone={currentUserPhone} setCurrentUserPhone={setCurrentUserPhone} />
        <main className="flex-1 bg-gray-50">
          <Routes>
            <Route
              path="/"
              element={
                <DealList
                  deals={deals}
                  addDeal={addDeal}
                  deleteDeal={deleteDeal}
                  updateDeal={updateDeal}
                  reorderDeals={reorderDeals}
                  currentUserPhone={currentUserPhone}
                />
              }
            />
            <Route
              path="/deal/:id"
              element={
                <Chat
                  deals={deals}
                  updateDeal={updateDeal}
                  currentUserPhone={currentUserPhone}
                />
              }
            />
          </Routes>
        </main>
        <Footer role={null} />
      </div>
    </Router>
  );
};

export default App;
