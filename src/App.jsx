import React, { useState, useEffect } from 'react';
import DealList from './components/DealList';
import Chat from './components/Chat';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [deals, setDeals] = useState([]);
  const [currentUserPhone, setCurrentUserPhone] = useState('test');
  const [selectedDealId, setSelectedDealId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('deals');
    if (stored) {
      setDeals(JSON.parse(stored));
    } else {
      const initialDeal = {
        id: Date.now(),
        name: 'Леггинсы 524 шт',
        amount: 25700,
        currency: '¥',
        stageIndex: 0,
        messages: [
          { id: 1, sender: 'Иван', text: 'Здравствуйте, я оформил заказ' },
          { id: 2, sender: '供应商', text: 'Добро пожаловать! Подтверждаю получение' },
        ],
        participants: [],
        transfer: 0,
        buyerPhone: 'Иван',
        supplierPhone: '供应商',
        createdBy: 'Иван',
      };
      setDeals([initialDeal]);
      localStorage.setItem('deals', JSON.stringify([initialDeal]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('deals', JSON.stringify(deals));
  }, [deals]);

  const addDeal = (newDeal) => setDeals(prev => [...prev, newDeal]);
  const updateDeal = (updated) => setDeals(prev => prev.map(d => d.id === updated.id ? updated : d));
  const deleteDeal = (id) => setDeals(prev => prev.filter(d => d.id !== id));
  const reorderDeals = (reordered) => setDeals(reordered);

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentUserPhone={currentUserPhone} setCurrentUserPhone={setCurrentUserPhone} />
      <main className="flex-1 bg-gray-50 overflow-hidden">
        {selectedDealId ? (
          <Chat
            deals={deals}
            updateDeal={updateDeal}
            currentUserPhone={currentUserPhone}
            setSelectedDealId={setSelectedDealId}
          />
        ) : (
          <DealList
            deals={deals}
            addDeal={addDeal}
            deleteDeal={deleteDeal}
            updateDeal={updateDeal}
            reorderDeals={reorderDeals}
            currentUserPhone={currentUserPhone}
            setSelectedDealId={setSelectedDealId}
          />
        )}
      </main>
      <Footer role={null} />
    </div>
  );
};

export default App;
