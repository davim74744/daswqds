import React, { ChangeEvent, useState } from 'react';
import { FormData } from '../types';
import { OPERATORS } from '../constants';
import PhoneIcon from './icons/PhoneIcon';
import CheckIcon from './icons/CheckIcon';

interface DetailsFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  isActive: boolean;
  isCompleted: boolean;
  onEdit: () => void;
}

const DetailsForm: React.FC<DetailsFormProps> = ({ formData, setFormData, onNext, isActive, isCompleted, onEdit }) => {
  const [phoneError, setPhoneError] = useState('');

  const formatPhoneNumber = (value: string) => {
      const cleaned = ('' + value).replace(/\D/g, '');
      if (!cleaned) return '';
      const match = cleaned.match(/^(\d{2})(\d{0,5})(\d{0,4})$/);
      if (match) {
          let formatted = `(${match[1]})`;
          if (match[2]) {
              formatted += ` ${match[2]}`;
          }
          if (match[3]) {
              formatted += `-${match[3]}`;
          }
          return formatted;
      }
      return value;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const cleaned = rawValue.replace(/\D/g, '');
      if (cleaned.length <= 11) {
          setFormData({ ...formData, phone: formatPhoneNumber(rawValue) });
          if (phoneError) setPhoneError('');
      }
  };

  const validateAndProceed = () => {
    const cleaned = formData.phone.replace(/\D/g, '');
    if (cleaned.length < 10 || cleaned.length > 11) {
        setPhoneError('Por favor, insira um número de telefone válido com DDD.');
        return;
    }
    setPhoneError('');
    onNext();
  }
  
  if (isCompleted && formData.phone && formData.operator) {
    return (
      <div className="bg-white/70 rounded-2xl p-6 border border-slate-200">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 text-white">
                    <CheckIcon />
                </div>
                <div>
                    <span className="text-slate-500 text-sm">Número e Operadora</span>
                    <p className="font-bold text-lg text-slate-800">{formData.phone} ({formData.operator.name})</p>
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
    <div className="relative bg-white/70 rounded-2xl border border-slate-200">
        <div className={`p-6 h-full flex flex-col transition-opacity duration-300 ${!isActive ? 'opacity-40' : 'opacity-100'}`}>
            <div className="text-left mb-6">
                <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">Informe seus dados</h2>
                <p className="mt-2 text-md text-slate-600">Digite o número com DDD e escolha sua operadora.</p>
            </div>
            <div className="space-y-6">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-2">
                        DDD + Número do telefone
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <PhoneIcon className="h-5 w-5 text-slate-400" />
                        </span>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="(XX) XXXXX-XXXX"
                            required
                            className="w-full bg-white/80 border border-slate-300 rounded-md pl-10 pr-4 py-3 text-lg text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-slate-500 focus:outline-none focus:border-slate-500 transition"
                        />
                    </div>
                    {phoneError && <p className="text-red-500 text-sm mt-2">{phoneError}</p>}
                </div>
                <div>
                    <h3 className="block text-sm font-medium text-slate-600 mb-2">
                        Selecione a operadora
                    </h3>
                    <fieldset className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <legend className="sr-only">Operadoras</legend>
                        {OPERATORS.map(op => (
                            <div key={op.id}>
                                <input 
                                    type="radio" 
                                    name="operator" 
                                    id={op.id} 
                                    value={op.id}
                                    checked={formData.operator?.id === op.id}
                                    onChange={() => setFormData({ ...formData, operator: op })}
                                    className="sr-only peer"
                                />
                                <label
                                    htmlFor={op.id}
                                    className="flex items-center justify-center p-3 rounded-md border-2 transition-all duration-200 font-medium cursor-pointer border-slate-300 bg-white text-slate-600 hover:border-slate-500 hover:-translate-y-0.5 peer-checked:bg-slate-800 peer-checked:border-slate-800 peer-checked:text-white peer-checked:shadow-md"
                                >
                                    <div className="flex items-center gap-2">
                                        <img src={op.logo} alt={op.name} className="h-5 object-contain" />
                                        <span className="text-sm font-semibold">{op.name}</span>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </fieldset>
                </div>
            </div>
            <div className="mt-auto pt-8 flex justify-end">
                <button
                    onClick={validateAndProceed}
                    disabled={!formData.phone || !formData.operator}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-all w-full duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 disabled:scale-100"
                >
                    Continuar
                </button>
            </div>
        </div>
        {!isActive && <div className="absolute inset-0 z-10 cursor-not-allowed rounded-2xl"></div>}
    </div>
  );
};

export default DetailsForm;