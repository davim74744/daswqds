import { TopUpAmount, Operator } from './types';

export const TOP_UP_AMOUNTS: TopUpAmount[] = [
  { value: 20, currency: 'R$', bonuses: ['+ 3 GB de Internet', 'WhatsApp ilimitado'] },
  { value: 40, currency: 'R$', bonuses: ['+ 8 GB de Internet', 'WhatsApp ilimitado'] },
  { value: 80, currency: 'R$', bonuses: ['+ 15 GB de Internet', 'WhatsApp ilimitado'] },
  { value: 100, currency: 'R$', bonuses: ['+ 25 GB de Internet', 'WhatsApp ilimitado'] },
];

export const OPERATORS: Operator[] = [
    { id: 'vivo', name: 'Vivo', logo: 'https://logo.clearbit.com/vivo.com.br' },
    { id: 'claro', name: 'Claro', logo: 'https://logo.clearbit.com/claro.com.br' },
    { id: 'tim', name: 'Tim', logo: 'https://logo.clearbit.com/tim.com.br' },
    { id: 'oi', name: 'Oi', logo: 'https://logo.clearbit.com/oi.com.br' },
    { id: 'algar', name: 'Algar', logo: 'https://logo.clearbit.com/algartelecom.com.br' },
    { id: 'correios', name: 'Correios', logo: 'https://logo.clearbit.com/correioscelular.com.br' },
];
