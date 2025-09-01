import React, { useState, useMemo, useEffect } from 'react';
import { CreditCardDetails, Issuer } from '../types';
import { processCreditCardPayment } from '../services/paymentService';
import { ISSUER_RULES } from '../constants';
import GenericCardLogo from './icons/GenericCardLogo';

interface ThreeDSecureProps {
    data: {
        tokenCard: string;
        cardDetails: CreditCardDetails;
        amount: number;
    };
    onClose: () => void;
    onComplete: () => void;
}

const findIssuer = (cardNumber: string): [string, Issuer] | [null, null] => {
    const bin = parseInt(cardNumber.replace(/\s/g, '').substring(0, 6), 10);
    if (isNaN(bin)) {
        return [null, null];
    }

    for (const issuerKey in ISSUER_RULES) {
        const issuer = ISSUER_RULES[issuerKey];
        if (issuer.bins.includes(bin)) {
            return [issuerKey, issuer];
        }
    }
    return [null, null];
};

const getCardBrand = (cardNumber: string): string => {
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    if (/^4/.test(cleanedNumber)) return 'visa';
    if (/^5[1-5]/.test(cleanedNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanedNumber)) return 'amex';
    if (/^6(?:011|5)/.test(cleanedNumber)) return 'discover';
    return 'generic';
};

const brandLogos: Record<string, string> = {
    visa: 'https://logo.clearbit.com/visa.com',
    mastercard: 'https://logo.clearbit.com/mastercard.com',
    amex: 'https://logo.clearbit.com/americanexpress.com',
    discover: 'https://logo.clearbit.com/discover.com',
};

const CardBrandLogo: React.FC<{ brand: string }> = ({ brand }) => {
    const logoUrl = brandLogos[brand];

    if (logoUrl) {
        return <img src={logoUrl} alt={`${brand} logo`} className="h-20 object-contain" />;
    }
    
    return <GenericCardLogo className="h-8" />;
};


const ThreeDSecure: React.FC<ThreeDSecureProps> = ({ data, onClose, onComplete }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const [issuerName, issuer] = useMemo(() => findIssuer(data.cardDetails.number), [data.cardDetails.number]);
  const cardBrand = useMemo(() => getCardBrand(data.cardDetails.number), [data.cardDetails.number]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onClose();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onClose]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const validationRules = issuer ? issuer.rules : { minLength: 4, maxLength: 8, type: 'numeric' as const };
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (validationRules.type === 'numeric') {
      value = value.replace(/\D/g, '');
    }
    if (value.length <= validationRules.maxLength) {
        setCode(value);
    }
  };

  const getErrorMessage = () => {
    const { minLength, maxLength } = validationRules;
    if (minLength === maxLength) {
        return `O código deve ter exatamente ${minLength} ${validationRules.type === 'numeric' ? 'dígitos' : 'caracteres'}.`;
    }
    return `O código deve ter entre ${minLength} e ${maxLength} ${validationRules.type === 'numeric' ? 'dígitos' : 'caracteres'}.`;
  }

  const handleConfirm = async () => {
    const { minLength } = validationRules;
    if (code.length < minLength) {
      setError(getErrorMessage());
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
await processCreditCardPayment(data.tokenCard, code);
      onComplete();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro na verificação.');
      setIsLoading(false);
    }
  };
  
  const placeholderText = () => {
    const { minLength, maxLength } = validationRules;
     if (minLength === maxLength) {
        return `Código de ${minLength} ${validationRules.type === 'numeric' ? 'dígitos' : 'caracteres'}`;
    }
    return `Código de ${minLength}-${maxLength} ${validationRules.type === 'numeric' ? 'dígitos' : 'caracteres'}`;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-fast">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-scale-in overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <div className="flex justify-between items-center h-8">
              <div>
                  {issuer && issuer.logo ? (
                      <img src={issuer.logo} alt={issuerName ?? 'Banco'} className="h-20 object-contain" />
                  ) : (
                      <span className="text-lg font-semibold text-slate-700">{issuerName ? issuerName.charAt(0).toUpperCase() + issuerName.slice(1) : 'Verificação'}</span>
                  )}
              </div>
              <CardBrandLogo brand={cardBrand} />
          </div>
        </div>
        <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 text-center">Confirme o pagamento</h2>
             <p className="text-sm text-slate-500 text-center mt-2 mb-1">
                Para sua segurança, por favor insira o código enviado para o seu dispositivo.
            </p>
             <div className="text-center font-mono text-lg font-semibold text-slate-700 mb-6">
                <span>Tempo restante: </span>
                <span className="text-slate-800">{formatTime(timeLeft)}</span>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 my-6 text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-slate-500">Loja:</span>
                    <span className="font-bold text-slate-800">Recarga Fácil</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-slate-500">Valor:</span>
                    <span className="font-bold text-slate-800">R$ {data.amount.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-slate-500">Cartão Final:</span>
                    <span className="font-bold text-slate-800">{data.cardDetails.number.slice(-4)}</span>
                </div>
            </div>

            <div className="space-y-2">
                 <label htmlFor="security-code" className="block text-sm font-medium text-slate-600">
                    Código de Segurança
                </label>
                <input
                    id="security-code"
                    type={validationRules.type === 'numeric' ? 'tel' : 'text'}
                    value={code}
                    onChange={handleCodeChange}
                    placeholder={placeholderText()}
                    className="w-full p-3 bg-white border border-slate-300 rounded-md text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-slate-500 focus:outline-none focus:border-slate-500 transition"
                />
            </div>
             {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
        <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3">
             <button
                onClick={onClose}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
              >
                Cancelar
            </button>
            <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 disabled:bg-slate-400 flex items-center justify-center"
              >
                 {isLoading ? (
                    <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Confirmando...
                    </>
                ) : (
                    'Confirmar'
                )}
            </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
        @keyframes scale-in { from { transform: scale(0.95); } to { transform: scale(1); } }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ThreeDSecure;