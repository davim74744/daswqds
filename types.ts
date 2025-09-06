export interface TopUpAmount {
  value: number;
  bonuses: string[];
  currency: string;
}

export interface Operator {
  id: string;
  name: string;
  logo: string;
}

export interface CreditCardDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export interface FormData {
  amount: TopUpAmount | null;
  phone: string;
  operator: Operator | null;
}