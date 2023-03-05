export interface BasicError {
  error: any;
  data?: any;
  message: string;
}

export interface CurrencyInterface {
  id: number;
  name: string;
  flag: string;
  symbol: string;
  country: string;
}