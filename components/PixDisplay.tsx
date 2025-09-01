import React, { useState } from 'react';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface PixDisplayProps {
    onGeneratePix: () => void;
    pixData: { qrCode: string; copyPaste: string } | null;
    isLoading: boolean;
}

const PixDisplay: React.FC<PixDisplayProps> = ({ onGeneratePix, pixData, isLoading }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (pixData) {
            navigator.clipboard.writeText(pixData.copyPaste);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (pixData) {
        return (
            <div className="text-center flex flex-col items-center mt-4 animate-fade-in-up">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Pagamento via Pix</h3>
                <p className="text-slate-500 mb-4 text-sm max-w-xs">Escaneie o código com o app do seu banco.</p>
                
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-md">
                    <img src={pixData.qrCode} alt="Pix QR Code" className="w-44 h-44" />
                </div>
                
                <p className="text-sm text-slate-500 my-4">ou copie o código abaixo</p>
                
                <div className="w-full p-2 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-between">
                    <code className="text-xs text-slate-600 truncate px-2 font-mono">
                        {pixData.copyPaste}
                    </code>
                    <button 
                        onClick={handleCopy} 
                        className="ml-2 p-2 rounded-md hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 shrink-0"
                        aria-label="Copiar código Pix"
                    >
                        {copied ? <CheckIcon className="h-5 w-5 text-slate-800" /> : <CopyIcon className="h-5 w-5 text-slate-500" />}
                    </button>
                </div>

                <div className="mt-6 text-sm text-slate-500 flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Aguardando confirmação do pagamento...
                </div>
            </div>
        );
    }

    return (
        <div className="text-center p-6">
             <button
                onClick={onGeneratePix}
                disabled={isLoading}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg text-lg"
                >
                {isLoading ? (
                    <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gerando...
                    </>
                ) : (
                    `Gerar Pix`
                )}
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-slate-500">
                <span className="text-xs font-medium">Pagamento seguro processado por</span>
                <img src="https://logo.clearbit.com/mercadopago.com.br" alt="Mercado Pago" className="h-4" />
            </div>
        </div>
    );
};

export default PixDisplay;