import React from 'react';
import LockIcon from './icons/LockIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white/60 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto max-w-screen-2xl px-4 py-4 md:px-6 flex items-center justify-between">
        <div className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
           Recarga Fácil
        </div>
        <div className="hidden md:flex items-center gap-2 text-slate-600 font-medium">
            <LockIcon className="h-5 w-5 text-slate-500" />
            <span>Recarga Segura</span>
        </div>
      </div>
    </header>
  );
};

export default Header;