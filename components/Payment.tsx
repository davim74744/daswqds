import React, { useState } from 'react';
import PixDisplay from './PixDisplay';
import CreditCardForm from './CreditCardForm';
import { FormData } from '../types';
import { generatePix } from '../services/paymentService';
import PixIcon from './icons/PixIcon';
import CreditCardIcon from './icons/CreditCardIcon';

interface PaymentProps {
  formData: FormData;
  onComplete: () => void;
  isActive: boolean;
}

const Payment: React.FC<PaymentProps> = ({ formData, onComplete, isActive }) => {
    const [selectedMethod, setSelectedMethod] = useState<'pix' | 'creditCard'>('pix');
    const [pixData, setPixData] = useState<{qrCode: string; copyPaste: string} | null>(null);
    const [isLoadingPix, setIsLoadingPix] = useState(false);
    const [error, setError] = useState('');

    const handleGeneratePix = async () => {
        if (!formData.amount) return;
        setIsLoadingPix(true);
        setError('');
        try {
            const data = await generatePix(formData.amount.value, formData.phone);
            setPixData(data);
             setTimeout(() => {
                onComplete();
             }, 10000000); 
        } catch (err: any) {
             setError(err.message || 'Ocorreu um erro ao gerar o PIX.');
             setIsLoadingPix(false);
        }
    };

    return (
        <>
            <div className="relative bg-white/70 rounded-2xl border border-slate-200 h-full">
                <div className={`p-6 h-full flex flex-col transition-opacity duration-300 ${!isActive ? 'opacity-40' : 'opacity-100'}`}>
                    <div className="text-left mb-6">
                        <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">Efetue o Pagamento</h2>
                        <p className="mt-2 text-md text-slate-600">Escolha uma das opções abaixo para continuar.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            onClick={() => setSelectedMethod('pix')}
                            className={`
                                relative p-4 rounded-lg border-2 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[100px]
                                ${selectedMethod === 'pix' 
                                    ? 'border-slate-800 bg-white shadow-lg ring-2 ring-offset-2 ring-offset-white/80 ring-slate-800' 
                                    : 'border-slate-300 bg-white/70 hover:border-slate-500 hover:-translate-y-0.5'}
                            `}
                        >
                            <PixIcon className="h-8 w-8 mb-2 text-slate-800" />
                            <span className="text-sm font-semibold text-slate-800">Pix</span>
                        </button>
                         <button
                            onClick={() => setSelectedMethod('creditCard')}
                            className={`
                                relative p-4 rounded-lg border-2 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[100px]
                                ${selectedMethod === 'creditCard' 
                                    ? 'border-slate-800 bg-white shadow-lg ring-2 ring-offset-2 ring-offset-white/80 ring-slate-800' 
                                    : 'border-slate-300 bg-white/70 hover:border-slate-500 hover:-translate-y-0.5'}
                            `}
                        >
                            <CreditCardIcon className="h-8 w-8 mb-2 text-slate-800" />
                            <span className="text-sm font-semibold text-slate-800">Cartão de Crédito</span>
                        </button>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-center transition-all duration-300">
                       {selectedMethod === 'pix' && (
                           <PixDisplay 
                               onGeneratePix={handleGeneratePix}
                               pixData={pixData}
                               isLoading={isLoadingPix} 
                           />
                       )}
                       {selectedMethod === 'creditCard' && formData.amount && (
                           <CreditCardForm 
                               amount={formData.amount.value}
                               onSuccess={(console.log('ok'))}
                           />
                       )}
                    </div>
                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                </div>
                 {!isActive && <div className="absolute inset-0 z-10 cursor-not-allowed rounded-2xl"></div>}
            </div>
        </>
    );
};

export default Payment;