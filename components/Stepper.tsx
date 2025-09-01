import React from 'react';
import CheckIcon from './icons/CheckIcon';

interface StepperProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: 'Escolha o Valor' },
  { number: 2, title: 'Informe os Dados' },
  { number: 3, title: 'Efetue o Pagamento' },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-5 md:top-6 left-0 w-full h-1 bg-slate-200" />
        {/* Progress Bar Active */}
        <div
          className="absolute top-5 md:top-6 left-0 h-1 bg-slate-800 transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Steps Container */}
        <div className="relative flex justify-between items-start">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div key={step.number} className="flex flex-col items-center z-10">
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out border-2
                    ${isCompleted
                      ? 'bg-slate-800 border-transparent text-white shadow-lg'
                      : ''}
                    ${isCurrent
                      ? 'bg-white border-4 border-slate-800 scale-110 shadow-lg'
                      : ''}
                    ${!isCompleted && !isCurrent
                      ? 'bg-white border-slate-300'
                      : ''}
                  `}
                >
                  {isCompleted ? (
                    <CheckIcon />
                  ) : (
                    <span
                      className={`
                        font-bold text-lg
                        ${isCurrent ? 'text-slate-800' : 'text-slate-400'}
                      `}
                    >
                      {step.number}
                    </span>
                  )}
                </div>
                {/* Step Label */}
                <p
                  className={`
                    mt-3 text-xs md:text-sm text-center font-medium w-24 md:w-28 transition-colors duration-500
                    ${isCurrent ? 'font-bold text-slate-800' : 'text-slate-500'}
                  `}
                >
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;