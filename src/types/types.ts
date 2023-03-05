export interface BasicError {
  error: any;
  data?: any;
  message: string;
}

export interface CurrencyInterface {
  id: number;
  name: string;
  symbol: string;
  flag: string;
  country: string;
}

export interface CurrencyResponseInterface extends CurrencyInterface {
  currency: CurrencyInterface[];
}
