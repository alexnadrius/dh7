import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DealList from './components/DealList';
import Chat from './components/Chat';
import Balance from './components/Balance';

const App = () => {
  const [deals, setDeals] = useState([]);
  const [currentUserPhone, setCurrentUserPhone] = useState('');

  useEffect(() => {
    const storedDeals = localStorage.getItem('deals');
    if (storedDeals) {
      setDeals(JSON.parse(storedDeals));
    } else {
      const initialDeal = {
        id: 1,
        name: 'Леггинсы 524 шт',
        amount: 25700,
        currency: '¥',
        stageIndex: 0,
        messages: [
          { id: 1, sender: 'Иван', text: 'Здравствуйте! Хотел бы заказать 524 леггинса, как обсудим доставку?' },
          { id: 2, sender: '供应商', text: '你好！发货可以空运或者海运，您更方便哪种方式？' },
          { id: 3, sender: 'Иван', text: 'Предпочитаю морем, дешевле.' },
          { id: 4, sender: '供应商', text: '好的，我安排装柜，下周发出。' }
        ],
        transfer: 0,
        createdBy: 'Иван',
        buyerPhone: 'Иван',
        supplierPhone: '供应商'
      };
      setDeals([initialDeal]);
      localStorage.setItem('deals', JSON.stringify([initialDeal]));
    }

    const storedUser = localStorage.getItem('currentUserPhone');
    if (storedUser) {
      setCurrentUserPhone(storedUser);
    } else {
      setCurrentUserPhone('Иван');
      localStorage.setItem('currentUserPhone', 'Иван');
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
          <Balance deals={deals} role={null} setDeals={setDeals} />
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
