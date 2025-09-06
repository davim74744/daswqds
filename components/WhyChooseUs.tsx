import React from 'react';

const TicketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 000-4V7a2 2 0 012-2z" />
    </svg>
);
const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);
const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118 0z" />
    </svg>
);

const features = [
    {
        icon: <TicketIcon />,
        title: 'Ofertas Imbatíveis',
        description: 'Temos ótimas ofertas para transferências internacionais todos os dias, garantindo o melhor valor para você.'
    },
    {
        icon: <ZapIcon />,
        title: 'Crédito na Hora',
        description: 'Sem complicações ou atrasos. O crédito chega instantaneamente ao celular de destino, pronto para ser usado.'
    },
    {
        icon: <ShieldIcon />,
        title: 'Pagamento Seguro e Confiável',
        description: 'Todos os pagamentos são processados em um ambiente 100% seguro, protegendo seus dados em cada etapa.'
    }
];

export const WhyChooseUs: React.FC = () => {
    return (
        <section className="bg-white py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Por que nos escolher?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        A maneira mais rápida e segura de enviar crédito internacionalmente.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.title} className="pt-6">
                            <div className="flow-root bg-gray-100 rounded-lg px-6 pb-8 h-full">
                                <div className="-mt-6">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-black rounded-md shadow-lg">
                                            {feature.icon}
                                        </span>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                                    <p className="mt-5 text-base text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};