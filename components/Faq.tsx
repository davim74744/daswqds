// Fix: Implement the Faq component to resolve module errors and provide the missing functionality.
import React, { useState } from 'react';

const faqs = [
  {
    question: 'Como funciona a transferência de crédito?',
    answer: 'É simples! Você escolhe o país, insere o número de telefone, seleciona o valor e realiza o pagamento. O crédito é enviado instantaneamente.',
  },
  {
    question: 'Quais países são suportados?',
    answer: 'Oferecemos suporte a uma vasta gama de países. Por favor, verifique nossa lista de países suportados na página de transferência.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas?',
    answer: 'Aceitamos os principais cartões de crédito e débito, além de outras formas de pagamento locais, dependendo do país.',
  },
  {
    question: 'A transferência é segura?',
    answer: 'Sim, a segurança é nossa prioridade. Utilizamos criptografia de ponta para proteger todas as transações e seus dados pessoais.',
  },
  {
    question: 'Quais são as taxas para enviar crédito?',
    answer: 'Nossas taxas são transparentes e exibidas antes de você confirmar o pagamento. Não há taxas ocultas.',
  },
  {
    question: 'Quanto tempo leva para o crédito ser recebido?',
    answer: 'Na maioria dos casos, o crédito é recebido instantaneamente. Em raras ocasiões, pode levar alguns minutos dependendo da operadora local.',
  },
  {
    question: 'O que acontece se eu enviar para o número errado?',
    answer: 'Como as transferências são instantâneas, elas não podem ser revertidas. É muito importante verificar se o número de destino está correto antes de confirmar.',
  },
  {
    question: 'Como posso contatar o suporte ao cliente?',
    answer: 'Nossa equipe de suporte está disponível 24/7. Você pode nos contatar através do chat em nosso site ou pelo e-mail de suporte.',
  },
];

const FaqItem: React.FC<{ faq: { question: string, answer: string }, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <dt>
        <button onClick={onClick} className="flex w-full items-start justify-between text-left text-gray-900">
          <span className="font-medium">{faq.question}</span>
          <span className="ml-6 flex h-7 items-center">
            {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            )}
          </span>
        </button>
      </dt>
      {isOpen && (
        <dd className="mt-2 pr-12">
          <p className="text-base text-gray-600">{faq.answer}</p>
        </dd>
      )}
    </div>
  );
};

export const Faq: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section className="bg-gray-100 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Perguntas Frequentes</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Não consegue encontrar a resposta que procura? Entre em contato com nossa equipe de suporte.
                    </p>
                </div>
                <div className="mx-auto mt-8 max-w-3xl">
                    <dl className="space-y-2">
                        {faqs.map((faq, index) => (
                           <FaqItem
                                key={index}
                                faq={faq}
                                isOpen={openFaq === index}
                                onClick={() => toggleFaq(index)}
                           />
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
};