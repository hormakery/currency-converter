//@ts-ignore
import { CurrencyInterface, CurrencyResponseInterface } from "../types/types";

const CURRENCY_BASE_URL = "https://restcountries.com/v3.1/all";
const FLAG_URL = "https://www.countryflags.io";

/**
 *
 * @description get currency
//  * @function getCurrency
 * @returns Promise<CurrencyInterface>
 */
export const getCurrency = async (): Promise<CurrencyInterface> => {
  const response = await fetch(
    `${CURRENCY_BASE_URL}/id
    }`
  );
  const data: CurrencyInterface = await response.json();
  const image = `${FLAG_URL}/${id}.jpg`;

  return { ...data, image };
};

/**
 *
 * @description getAllcurrency
 * @function getAllCurrency
 * @returns Promise<CurrencyResponseInterface>
 */

export const getAllCurrency = async (): Promise<CurrencyResponseInterface> => {
  const response = await fetch(
    `${CURRENCY_BASE_URL}/currency?
    }`
  );
  const data: CurrencyResponseInterface = await response.json();
  const allCurrency = data.currency.map(({ name }) => getCurrency(name));
  const currencies = await Promise.all(allCurrency);

  const currency = data.currency.map((currency) => {
    // const currencyDetail = currencyDetail.find(({ name}) => name === currency.name);

    return {
      ...currency,
      // image: `${currencyDetail?.image}`,
      // name: `${currencyDetail?.name} `,
      // symbol: `${currencyDetail?.symbol} `,
      // symbol_native: `${currencyDetail?.symbol_native} `,
    };
  });

  return { ...data, currency };
};
