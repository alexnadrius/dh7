import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DealList from './components/DealList';
import Chat from './components/Chat';
import Balance from './components/Balance';

const App = () => {
  const [deals, setDeals] = useState([]);
  const [currentUserPhone, setCurrentUserPhone] = useState('1');

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('currentUserPhone', currentUserPhone);
  }, [currentUserPhone]);

  useEffect(() => {
    const storedDeals = localStorage.getItem('deals');
    if (storedDeals) {
      setDeals(JSON.parse(storedDeals));
    } else {
      const initialDeals = [
        {
          id: 1,
          name: 'Леггинсы 524 шт',
          amount: 25700,
          currency: '¥',
          stageIndex: 0,
          messages: [
            { id: 1, text: 'Добрый день! Отправка завтра.', sender: '中' },
            { id: 2, text: 'Ок, жду трек.', sender: '1' },
          ],
          participants: [],
          transfer: 0,
          buyerPhone: '1',
          supplierPhone: '中',
          createdBy: '1',
        },
      ];
      setDeals(initialDeals);
      localStorage.setItem('deals', JSON.stringify(initialDeals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('deals', JSON.stringify(deals));
  }, [deals]);

  const addDeal = (newDeal) => setDeals((prev) => [...prev, newDeal]);

  const updateDeal = (updatedDeal) =>
    setDeals((prev) =>
      prev.map((d) => (d.id === updatedDeal.id ? updatedDeal : d))
    );

  const deleteDeal = (id) => {
    const updated = deals.filter((d) => d.id !== id);
    setDeals(updated);
  };

  const reorderDeals = (newOrder) => {
    setDeals(newOrder);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentUserPhone={currentUserPhone} setCurrentUserPhone={setCurrentUserPhone} />
      <main className="flex-1 bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Balance deals={deals} role={'buyer'} setDeals={setDeals} />
                <DealList
                  deals={deals}
                  addDeal={addDeal}
                  deleteDeal={deleteDeal}
                  updateDeal={updateDeal}
                  reorderDeals={reorderDeals}
                  currentUserPhone={currentUserPhone}
                />
              </>
            }
          />
          <Route
            path="/deal/:id"
            element={<Chat deals={deals} updateDeal={updateDeal} />}
          />
        </Routes>
      </main>
      <Footer role="buyer" />
    </div>
  );
};

export default App;
