import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SiTelegram, SiWechat } from 'react-icons/si';

const Footer = ({ role }) => {
  const icon =
    role === 'supplier' ? (
      <SiWechat className="text-green-600" size={18} />
    ) : (
      <SiTelegram className="text-blue-500" size={18} />
    );

  return (
    <footer className="bg-gray-100 text-gray-600 p-4 flex justify-center items-center text-sm border-t w-full fixed bottom-0 z-50 sm:relative">
      <div className="flex items-center gap-2 text-center">
        <span className="text-gray-800 font-medium">🛠 Техподдержка</span>
        <ArrowRight size={14} className="text-gray-400" />
        {icon}
      </div>
    </footer>
  );
};

export default Footer;
