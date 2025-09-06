import React, { useState } from 'react';

const carriers = [
  {
    name: 'Operadora Vivo',
    instructions: 'Ligue para *8000 ou envie um SMS com a palavra "SALDO" para 8000.',
    iconColor: 'bg-purple-600',
  },
  {
    name: 'Operadora TIM',
    instructions: 'Ligue para *222# e o saldo aparecerá na tela do seu celular.',
    iconColor: 'bg-blue-600',
  },
  {
    name: 'Operadora Claro',
    instructions: 'Ligue para *1052# e siga as opções do menu ou envie um SMS com a palavra "SALDO" para 1052.',
    iconColor: 'bg-red-600',
  },
  {
    name: 'Operadora Oi',
    instructions: 'Ligue para *804 para receber um SMS com o seu saldo de créditos.',
    iconColor: 'bg-yellow-500',
  },
  {
    name: 'Operadora Correios',
    instructions: 'Ligue para *225# para consultar o seu saldo e a validade dos seus créditos.',
    iconColor: 'bg-yellow-400',
  },
  {
    name: 'Operadora Algar',
    instructions: 'Ligue para *22 do seu celular Algar para consultar o saldo de créditos.',
    iconColor: 'bg-green-600',
  },
];

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);


export const CarrierFaq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Como Consultar seu Saldo</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Instruções rápidas para verificar o saldo de crédito nas principais operadoras.
                    </p>
                </div>
                <div className="mx-auto mt-12 max-w-3xl space-y-4">
                    {carriers.map((carrier, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={carrier.name} className="overflow-hidden rounded-lg bg-gray-100 transition-all duration-300">
                                <button
                                    onClick={() => toggleItem(index)}
                                    className={`flex w-full items-center justify-between p-6 text-left transition-colors duration-300 ${isOpen ? '' : 'text-gray-900 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${carrier.iconColor}`}>
                                            <PhoneIcon className="text-white" />
                                        </div>
                                        <span className="text-lg font-semibold">{carrier.name}</span>
                                    </div>
                                    <ChevronIcon isOpen={isOpen} />
                                </button>
                                <div
                                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}
                                >
                                    <div className="p-6 pt-0 text-gray-600">
                                        <p>{carrier.instructions}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
