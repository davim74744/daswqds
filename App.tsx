import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Confirmation from './components/Confirmation';
import AmountSelector from './components/AmountSelector';
import DetailsForm from './components/DetailsForm';
import Payment from './components/Payment';
import Stepper from './components/Stepper';
import { FormData, TopUpAmount, Operator } from './types';
import { OPERATORS } from './constants';
import FacebookIcon from './components/icons/FacebookIcon';
import InstagramIcon from './components/icons/InstagramIcon';
import TwitterIcon from './components/icons/TwitterIcon';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    amount: null,
    phone: '',
    operator: OPERATORS[0],
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  }

  const handleSuccess = () => {
    setIsCompleted(true);
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setFormData({
      amount: null,
      phone: '',
      operator: OPERATORS[0],
    });
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen font-sans flex flex-col relative overflow-x-hidden bg-slate-100">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[800px] -z-10 bg-gradient-to-br from-slate-400/10 via-transparent to-slate-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <Header />
      
      {isCompleted && formData.amount && formData.operator ? (
        <main className="container mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 py-4 flex-grow">
          <Confirmation
            amount={formData.amount}
            phone={formData.phone}
            operator={formData.operator}
            onRestart={handleRestart}
          />
        </main>
      ) : (
        <>
          <Hero />
          <main className="w-full flex-grow">
            <div className="bg-white/60 backdrop-blur-xl border-y border-slate-200">
              <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 py-8 sm:py-12">
                <Stepper currentStep={currentStep} />
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10">
                    <AmountSelector
                      selectedAmount={formData.amount}
                      onSelectAmount={(amount: TopUpAmount) => {
                        setFormData({ ...formData, amount });
                        handleNext();
                      }}
                      isActive={currentStep === 1}
                      isCompleted={currentStep > 1}
                      onEdit={() => handleEditStep(1)}
                    />
                    <DetailsForm
                      formData={formData}
                      setFormData={setFormData}
                      onNext={handleNext}
                      isActive={currentStep === 2}
                      isCompleted={currentStep > 2}
                      onEdit={() => handleEditStep(2)}
                    />
                    <Payment
                      formData={formData}
                      onComplete={handleSuccess}
                      isActive={currentStep === 3}
                    />
                </div>
              </div>
            </div>
          </main>
        </>
      )}

      <footer className="w-full bg-white border-t border-slate-200">
        <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Logo and description */}
            <div className="lg:col-span-2">
              <div className="text-2xl font-bold tracking-tight text-slate-800 mb-2">
                Recarga Fácil
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                Sua plataforma confiável para recargas rápidas e seguras com os melhores bônus.
              </p>
            </div>
            {/* Column 2: Links */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4 tracking-wide">Links Úteis</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Termos de Serviço</a></li>
                <li><a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Ajuda & FAQ</a></li>
              </ul>
            </div>
             {/* Column 3: Social */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-4 tracking-wide">Siga-nos</h3>
               <div className="flex items-center gap-4">
                  <a href="#" aria-label="Facebook" className="text-slate-500 hover:text-slate-900 transition-colors"><FacebookIcon className="h-6 w-6" /></a>
                  <a href="#" aria-label="Instagram" className="text-slate-500 hover:text-slate-900 transition-colors"><InstagramIcon className="h-6 w-6" /></a>
                  <a href="#" aria-label="Twitter" className="text-slate-500 hover:text-slate-900 transition-colors"><TwitterIcon className="h-6 w-6" /></a>
               </div>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
            <p>© 2024 Recarga Fácil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
         @keyframes pulse-slow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.1) rotate(3deg); opacity: 0.8; }
        }
        .animate-pulse-slow {
            animation: pulse-slow 10s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;