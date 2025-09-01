import React from 'react';

interface StepProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ title, subtitle, children }) => {
  return (
    <div className="w-full">
        <div className="text-left mb-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
            {subtitle && <p className="mt-2 text-md text-slate-600">{subtitle}</p>}
        </div>
        {children}
    </div>
  );
};

export default Step;