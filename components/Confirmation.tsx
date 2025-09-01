import React from 'react';
import { TopUpAmount, Operator } from '../types';

interface ConfirmationProps {
    amount: TopUpAmount;
    phone: string;
    operator: Operator;
    onRestart: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ amount, phone, operator, onRestart }) => {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 animate-fade-in">
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg p-6 md:p-8">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">Recarga Realizada com Sucesso!</h2>
              <p className="mt-2 text-md text-slate-600">Obrigado por utilizar nossos serviços. Seu crédito será adicionado em breve.</p>

              <div className="mt-6 bg-slate-100/70 p-4 rounded-lg text-left text-sm space-y-2 border border-slate-200">
                 <div className="flex justify-between">
                    <span className="text-slate-500">Valor:</span>
                    <span className="font-bold text-slate-800">R$ {amount.value.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-slate-500">Número:</span>
                    <span className="font-bold text-slate-800">{phone}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Operadora:</span>
                    <span className="font-bold text-slate-800">{operator.name}</span>
                </div>
              </div>
              
               <button 
                  onClick={onRestart}
                  className="mt-8 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-slate-800 shadow-md hover:shadow-lg transform hover:scale-105">
                  Fazer Nova Recarga
              </button>
          </div>
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 0.5s ease-out forwards;
            }
          `}</style>
      </div>
    );
};

export default Confirmation;