import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DealList from './components/DealList';
import Chat from './components/Chat';
import Balance from './components/Balance';

const DealRoute = ({ deals, updateDeal, currentUserPhone }) => {
  const { id } = useParams();
  const deal = deals.find((d) => d.id === Number(id));
  if (!deal) return <div className="p-4">Сделка не найдена</div>;

  return (
    <Chat
      deal={deal}
      updateDeal={updateDeal}
      setSelectedDealId={() => window.history.back()}
      currentUserPhone={currentUserPhone}
    />
  );
};

const App = () => {
  const [deals, setDeals] = React.useState(() => {
    const saved = localStorage.getItem('deals');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        name: 'Леггинсы 524 шт',
        amount: 25700,
        currency: 'юань',
        stageIndex: 0,
        createdBy: 'test',
        buyerPhone: 'test',
        supplierPhone: '供应商',
        messages: [
          { id: 1, sender: 'test', text: 'Здравствуйте! Готов оплатить.' },
          { id: 2, sender: '供应商', text: 'Отлично, сейчас выставлю счёт.' }
        ]
      }
    ];
  });

  const [currentUserPhone, setCurrentUserPhone] = React.useState(() => {
    return localStorage.getItem('currentUserPhone') || 'test';
  });

  React.useEffect(() => {
    localStorage.setItem('deals', JSON.stringify(deals));
  }, [deals]);

  React.useEffect(() => {
    localStorage.setItem('currentUserPhone', currentUserPhone);
  }, [currentUserPhone]);

  const addDeal = (newDeal) => setDeals((prev) => [...prev, newDeal]);

  const updateDeal = (updated) => {
    setDeals((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
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
    <div className="flex flex-col min-h-screen">
      <Header currentUserPhone={currentUserPhone} setCurrentUserPhone={setCurrentUserPhone} />
      <main className="flex-1 bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Balance deals={deals} role={null} setDeals={setDeals} />
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
            element={
              <DealRoute
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
  );
};

export default App;
