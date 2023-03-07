import { CurrencyInterface } from "../types/types";
import debounce from "lodash.debounce";
const COUNTRY_BASE_URL = "https://restcountries.com/v3.1/all";
const CURRENCY_BASE_URL = "https://currency-converter18.p.rapidapi.com/api/v1";

const BASE_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "currency-converter18.p.rapidapi.com",
    "X-RapidAPI-Key": "R6CLxoS2y8mshzTwva1Uxm3VZJ3Kp1mhAk5jsnRFOa8Q1Bsq7H",
  },
};

/**
 *
 * @description get countries
 * @function getCountries
 * @returns Promise<CurrencyInterface>
 */
export const getCountries = async (): Promise<any> => {
  const response = await fetch(COUNTRY_BASE_URL);
  const data: any = await response.json();

  const countries = data
    .filter((country: any) => country.currencies)
    .map((country: any) => {
      return {
        flag: country.flag,
        country: country.name.common,
        currencies: country.currencies,
      };
    });

  return countries;
};

/**
 *
 * @description getCurrencies
 * @function getCurrencies
 * @returns Promise<CurrencyInterface[]>
 */

export const getCurrencies = async (): Promise<CurrencyInterface[]> => {
  const countries = await getCountries();

  const response = await fetch(
    `${CURRENCY_BASE_URL}/supportedCurrencies`,
    BASE_API_OPTIONS
  );

  const data = await response.json();
  const currencies: CurrencyInterface[] = data.map(
    (currency: any, index: number) => {
      const matched = countries.find(
        (country: any) => country.currencies[currency.symbol]
      );

      if (!matched) return;

      const { currencies, ...rest } = matched;
      return {
        ...currencies[currency.symbol],
        ...rest,
        name: currency.symbol,
        id: Date.now() * index,
      };
    }
  );

  return currencies.filter((country) => country);
};

/**
 *
 * @description convertCurrency
 * @function convertCurrency
 * @returns Promise<CurrencyResponseInterface>
 */

type ConvertCurrencyPayload = {
  to: string;
  from: string;
  amount: string;
};

export const convertCurrency = debounce(
  async (payload: ConvertCurrencyPayload): Promise<any> => {
    const response = await fetch(
      `${CURRENCY_BASE_URL}/convert?from=${payload.from}&to=${payload.to}&amount=${payload.amount}`,
      BASE_API_OPTIONS
    );
    const currency = await response.json();
    return currency.result;
  },
  50
);
