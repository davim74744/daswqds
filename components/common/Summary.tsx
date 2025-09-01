import React from 'react';
import { FormData } from '../../types';

interface SummaryProps {
    formData: FormData;
}

const Summary: React.FC<SummaryProps> = ({ formData }) => {
    const total = formData.amount?.value || 0;

    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 sticky top-24 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-900/10 pb-3 mb-4">Resumo do Pedido</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center min-h-[20px]">
                    <span className="text-slate-500">Valor da Recarga:</span>
                    {formData.amount && <span className="font-medium text-slate-700">R$ {formData.amount.value.toFixed(2)}</span>}
                </div>
                <div className="flex justify-between items-center min-h-[20px]">
                    <span className="text-slate-500">Número:</span>
                    {formData.phone && <span className="font-medium text-slate-700">{formData.phone}</span>}
                </div>
                 <div className="flex justify-between items-center min-h-[20px]">
                    <span className="text-slate-500">Operadora:</span>
                    {formData.operator && <span className="font-medium text-slate-700">{formData.operator.name}</span>}
                </div>
                <div className="border-t border-slate-900/10 my-4 pt-4"></div>
                 <div className="flex justify-between text-lg">
                    <span className="font-semibold text-slate-800">Total:</span>
                    <span className="font-bold text-cyan-600">R$ {total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default Summary;
