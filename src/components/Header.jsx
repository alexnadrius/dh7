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
    <header className="bg-blue-600 text-white px-4 py-3 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex items-center gap-2 text-white text-lg font-semibold">
        <Handshake size={24} />
        DealHub
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
        {inputVisible ? (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="tel"
              placeholder="Введите номер"
              className="flex-1 px-2 py-1 rounded text-sm text-black"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              autoFocus
            />
            <button
              className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-semibold"
              onClick={handleLogin}
            >
              Войти
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <span className="text-white text-sm">
              Вы вошли как: <strong>{currentUserPhone}</strong>
            </span>
            <button
              className="bg-white text-blue-600 px-4 py-1 rounded text-sm font-semibold"
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
