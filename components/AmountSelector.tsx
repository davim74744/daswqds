import React from 'react';
import { TopUpAmount } from '../types';
import { TOP_UP_AMOUNTS } from '../constants';
import CheckIcon from './icons/CheckIcon';

interface AmountSelectorProps {
  selectedAmount: TopUpAmount | null;
  onSelectAmount: (amount: TopUpAmount) => void;
  isActive: boolean;
  isCompleted: boolean;
  onEdit: () => void;
}

const AmountSelector: React.FC<AmountSelectorProps> = ({ selectedAmount, onSelectAmount, isActive, isCompleted, onEdit }) => {
  if (isCompleted && selectedAmount) {
    return (
      <div className="bg-white/70 rounded-2xl p-6 h-full border border-slate-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 text-white">
              <CheckIcon />
            </div>
            <div>
              <span className="text-slate-500 text-sm">Valor</span>
              <p className="font-bold text-lg text-slate-800">R$ {selectedAmount.value.toFixed(2)}</p>
            </div>
          </div>
          <button onClick={onEdit} className="font-bold text-sm text-slate-700 hover:text-slate-900 transition-colors">
            Editar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white/70 rounded-2xl h-full border border-slate-200">
      <div className={`p-6 transition-opacity duration-300 ${!isActive ? 'opacity-40' : 'opacity-100'}`}>
        <div className="text-left mb-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">Escolha um valor</h2>
          <p className="mt-2 text-md text-slate-600">Selecione um dos valores abaixo para iniciar sua recarga.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {TOP_UP_AMOUNTS.map((amount) => (
            <button
              type="button"
              key={amount.value}
              onClick={() => onSelectAmount(amount)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white/50 focus:ring-slate-800 transform hover:-translate-y-1 hover:shadow-xl flex flex-col min-h-[180px]
              ${selectedAmount?.value === amount.value 
                  ? 'bg-slate-800 border-slate-800 text-white shadow-lg ring-2 ring-offset-2 ring-offset-white/50 ring-slate-800' 
                  : 'bg-white border-slate-300 hover:border-slate-500 hover:bg-slate-100 text-slate-800'}
              `}
            >
              <div className="flex-grow flex items-center justify-center">
                <span className={`text-xl font-medium align-top transition-colors ${selectedAmount?.value === amount.value ? 'text-slate-300' : 'text-slate-400'}`}>{amount.currency}</span>
                <span className={`text-5xl font-extrabold transition-colors ${selectedAmount?.value === amount.value ? 'text-white' : 'text-slate-800'}`}>{amount.value}</span>
              </div>
              <div className={`w-full border-t my-3 transition-colors ${selectedAmount?.value === amount.value ? 'border-white/30' : 'border-slate-200'}`}></div>
              <div className="text-left w-full">
                <p className={`text-xs font-bold mb-1 transition-colors ${selectedAmount?.value === amount.value ? 'text-white' : 'text-slate-600'}`}>Bônus incluído:</p>
                <div className="space-y-0.5">
                  {amount.bonuses.map((bonus, index) => (
                    <p key={index} className={`text-xs transition-colors ${selectedAmount?.value === amount.value ? 'text-slate-300' : 'text-slate-600'}`}>
                      {bonus}
                    </p>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {!isActive && <div className="absolute inset-0 z-10 cursor-not-allowed rounded-2xl"></div>}
    </div>
  );
};

export default AmountSelector;