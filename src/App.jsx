import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DealList from './components/DealList';
import Chat from './components/Chat';
import Balance from './components/Balance';

const App = () => {
  const [deals, setDeals] = useState([]);
  const [currentUserPhone, setCurrentUserPhone] = useState('1'); // Автоавторизация под user 1
  const [selectedDealId, setSelectedDealId] = useState(null);

  useEffect(() => {
    const storedDeals = localStorage.getItem('deals');
    if (storedDeals) {
      setDeals(JSON.parse(storedDeals));
    } else {
      // Добавим тестовую сделку
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
    localStorage.setItem('deals', JSON.stringify(updated));
  };

  const reorderDeals = (newOrder) => {
    setDeals(newOrder);
    localStorage.setItem('deals', JSON.stringify(newOrder));
  };

  const selectedDeal = Array.isArray(deals)
    ? deals.find((d) => d.id === selectedDealId)
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentUserPhone={currentUserPhone} setCurrentUserPhone={setCurrentUserPhone} />
      <main className="flex-1 bg-gray-50">
        {selectedDealId && selectedDeal ? (
          <Chat
            deal={selectedDeal}
            updateDeal={updateDeal}
            setSelectedDealId={setSelectedDealId}
            currentUserPhone={currentUserPhone}
          />
        ) : (
          <>
            <Balance deals={deals} role={'buyer'} setDeals={setDeals} />
            <DealList
              deals={deals}
              addDeal={addDeal}
              deleteDeal={deleteDeal}
              updateDeal={updateDeal}
              reorderDeals={reorderDeals}
              currentUserPhone={currentUserPhone}
              setSelectedDealId={setSelectedDealId}
            />
          </>
        )}
      </main>
      <Footer role={'buyer'} />
    </div>
  );
};

export default App;
