import React, { useState, useEffect } from 'react';
import { Handshake } from 'lucide-react';

const Header = ({ currentUserPhone, setCurrentUserPhone }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');

  useEffect(() => {
    if (!currentUserPhone) setInputVisible(true);
  }, [currentUserPhone]);

  const handleLogin = () => {
    const trimmed = phoneInput.trim();
    if (trimmed) {
      setCurrentUserPhone(trimmed);
      localStorage.setItem('currentUserPhone', trimmed);
      setInputVisible(false);
    }
  };

  const handleLogout = () => {
    setCurrentUserPhone('');
    localStorage.removeItem('currentUserPhone');
    setInputVisible(true);
  };

  return (
    <header className="bg-blue-600 text-white px-4 py-3 flex flex-wrap justify-between items-center">
      <div className="flex items-center gap-2 text-white text-lg font-semibold">
        <Handshake size={24} />
        DealHub
      </div>

      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        {inputVisible ? (
          <>
            <input
              type="tel"
              placeholder="Введите номер"
              className="px-2 py-1 rounded text-sm text-black"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              autoFocus
            />
            <button
              className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-semibold"
              onClick={handleLogin}
            >
              Войти
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <span className="whitespace-nowrap">Вы вошли как: <strong>{currentUserPhone}</strong></span>
            <button
              className="bg-white text-blue-600 px-3 py-1 rounded font-semibold"
              onClick={handleLogout}
            >
              Сменить
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
