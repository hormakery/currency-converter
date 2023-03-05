export interface BasicError {
  error: any;
  data?: any;
  message: string;
}

export interface CurrencyInterface {
  id: number;
  name: string;
  symbol: string;
  symbol_native: string;
}

export interface CountryInterface extends CurrencyInterface {
  image: string;
  id: number;
}

export interface CurrencyResponseInterface extends CurrencyInterface {
  currency: CurrencyInterface[];
}
