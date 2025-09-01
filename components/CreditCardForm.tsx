import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CreditCardDetails } from '../types';
import { generateCardToken } from '../services/paymentService';


interface CreditCardFormProps {
    amount: number;
    onSuccess: (tokenCard: string, amount: number, cardDetails: CreditCardDetails) => void;
}

// Helper functions for validation
const luhnCheck = (val: string): boolean => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = val.length - 1; i >= 0; i--) {
    let digit = parseInt(val.charAt(i), 10);
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return (sum % 10) === 0;
};

const getCardType = (number: string): 'amex' | 'other' => {
  if (/^3[47]/.test(number)) {
    return 'amex';
  }
  return 'other';
};


const CreditCardForm: React.FC<CreditCardFormProps> = ({ amount, onSuccess }) => {
    const [cardDetails, setCardDetails] = useState<CreditCardDetails>({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
    });
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
      number: '',
      name: '',
      expiry: '',
      cvv: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'number') {
            const cleaned = value.replace(/\D/g, '');
            const cardType = getCardType(cleaned);
            
            if (cardType === 'amex') {
                // Format: XXXX XXXXXX XXXXX (15 digits)
                const match = cleaned.slice(0, 15).match(/(\d{1,4})(\d{0,6})(\d{0,5})/);
                if (match) {
                    formattedValue = [match[1], match[2], match[3]].filter(Boolean).join(' ');
                } else {
                    formattedValue = cleaned.slice(0, 15);
                }
            } else {
                // Format: XXXX XXXX XXXX XXXX (16 digits)
                formattedValue = cleaned.slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
            }
        } else if (name === 'expiry') {
            formattedValue = value.replace(/[^\d]/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);
        } else if (name === 'cvv') {
             const cardType = getCardType(cardDetails.number.replace(/\s/g, ''));
             const maxLength = cardType === 'amex' ? 4 : 3;
             formattedValue = value.replace(/[^\d]/g, '').slice(0, maxLength);
        }

        setCardDetails({ ...cardDetails, [name]: formattedValue });
        if(errors[name as keyof typeof errors]) {
          setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFocusCVV = () => setIsFlipped(true);
    const handleBlurCVV = () => setIsFlipped(false);

    const validate = () => {
        const newErrors = { number: '', name: '', expiry: '', cvv: '' };
        const { number, expiry, cvv, name } = cardDetails;
        const cleanedNumber = number.replace(/\s/g, '');

        if (!cleanedNumber) newErrors.number = 'O número do cartão é obrigatório.';
        if (!name) newErrors.name = 'O nome no cartão é obrigatório.';
        if (!expiry) newErrors.expiry = 'A data de validade é obrigatória.';
        if (!cvv) newErrors.cvv = 'O CVV é obrigatório.';

        if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
            newErrors.expiry = 'Data inválida. Use MM/AA.';
        } else {
            const [monthStr, yearStr] = expiry.split('/');
            const month = parseInt(monthStr, 10);
            const year = parseInt(yearStr, 10);
            if (year < 25 || (year === 25 && month <= 9)) {
                newErrors.expiry = 'Cartão expirado.';
            }
        }
        
        const cardType = getCardType(cleanedNumber);
        if (cleanedNumber) {
            if (cardType === 'amex') {
                if (cleanedNumber.length !== 15) newErrors.number = 'Amex deve ter 15 dígitos.';
                if (cvv && cvv.length !== 4) newErrors.cvv = 'CVV de Amex deve ter 4 dígitos.';
            } else {
                if (cleanedNumber.length !== 16) newErrors.number = 'Cartão deve ter 16 dígitos.';
                if (cvv && cvv.length !== 3) newErrors.cvv = 'CVV deve ter 3 dígitos.';
            }

            if (!luhnCheck(cleanedNumber)) {
                newErrors.number = 'Número de cartão inválido.';
            }
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setIsLoading(true);
        
        try {
            // Chama a nova função de tokenização com os dados brutos do cartão
            const tokenResponse = await generateCardToken(cardDetails);
            
               if (tokenResponse && tokenResponse.success && tokenResponse.tokenCard) {
             setIsLoading(false);
             onSuccess(tokenResponse.tokenCard, amount, cardDetails);
            } else {
                throw new Error("Resposta da API de tokenização inválida.");
            }
        } catch (err: any) {
            setIsLoading(false);
            setErrors({ ...errors, number: err.message || 'Falha na tokenização do cartão.' });
        }
    };
    
    return (
        <div className="w-full animate-fade-in-up">
            <div className="w-full max-w-sm mx-auto" style={{ perspective: '1000px' }}>
                {/* Visual Card */}
                <div
                    className={`relative w-full h-48 rounded-xl shadow-lg transition-transform duration-500`}
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                    {/* Card Front */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl p-5 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
                        <div className="flex justify-between items-start">
                             <div className="w-10 h-7 bg-yellow-400/80 rounded-md shadow-inner border border-yellow-500/50"></div>
                             <span className="font-mono text-xl text-slate-600 font-semibold">{getCardType(cardDetails.number.replace(/\s/g, '')) === 'amex' ? 'AMEX' : 'VISA'}</span>
                        </div>
                        <div className="text-left">
                            <p className="font-mono text-xl tracking-wider text-slate-700">{cardDetails.number || '#### #### #### ####'}</p>
                            <div className="flex justify-between mt-2">
                                <p className="text-xs font-semibold uppercase text-slate-500">{cardDetails.name || 'NOME COMPLETO'}</p>
                                <p className="text-xs font-semibold uppercase text-slate-500">{cardDetails.expiry || 'MM/AA'}</p>
                            </div>
                        </div>
                    </div>
                    {/* Card Back */}
                     <div className="absolute inset-0 bg-slate-200 rounded-xl p-2" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <div className="h-10 w-full bg-slate-800 mt-4"></div>
                        <div className="text-right p-3">
                            <p className="text-xs text-slate-500 mb-1">CVV</p>
                            <div className="h-8 w-full bg-white rounded-md flex items-center justify-end px-2">
                                <p className="font-mono text-slate-700">{cardDetails.cvv}</p>
                            </div>
                        </div>
                     </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                 <div>
                    <input type="text" name="number" placeholder="Número do Cartão" value={cardDetails.number} onChange={handleInputChange} className={`w-full p-3 bg-white/80 border rounded-md text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-slate-500 focus:outline-none transition ${errors.number ? 'border-red-500' : 'border-slate-300'}`} />
                    {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                </div>
                 <div>
                    <input type="text" name="name" placeholder="Nome no Cartão" value={cardDetails.name} onChange={handleInputChange} className={`w-full p-3 bg-white/80 border rounded-md text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-slate-500 focus:outline-none transition ${errors.name ? 'border-red-500' : 'border-slate-300'}`} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <input type="text" name="expiry" placeholder="Validade (MM/AA)" value={cardDetails.expiry} onChange={handleInputChange} className={`w-full p-3 bg-white/80 border rounded-md text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-slate-500 focus:outline-none transition ${errors.expiry ? 'border-red-500' : 'border-slate-300'}`} />
                        {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div className="w-1/2">
                        <input type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleInputChange} onFocus={handleFocusCVV} onBlur={handleBlurCVV} className={`w-full p-3 bg-white/80 border rounded-md text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-slate-500 focus:outline-none transition ${errors.cvv ? 'border-red-500' : 'border-slate-300'}`} />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                </div>
                <div className="pt-2">
                    <button type="submit" disabled={isLoading} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg text-lg">
                        {isLoading ? 'Verificando...' : `Pagar R$ ${amount.toFixed(2)}`}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreditCardForm;