import { CurrencyInterface, CurrencyResponseInterface } from "../types/types";

const COUNTRY_BASE_URL = "https://restcountries.com/v3.1/all";
// const FLAG_URL = "https://www.countryflags.io";

/**
 *
 * @description get countries
//  * @function getCountries
 * @returns Promise<CurrencyInterface>
 */
export const getCountries = async (): Promise<CurrencyInterface> => {
  const response = await fetch(COUNTRY_BASE_URL);
  const data: any = await response.json();

  const countries = data.map((country: any) => {
    const [currency]: any = Object.values(country.currencies);
    return {
      flag: country.flag,
      name: currency.name,
      symbol: currency.symbol,
      country: country.name.common,
    };
  });
  return countries;
};

/**
 *
//  * @description getAllcurrency
//  * @function getAllCurrency
//  * @returns Promise<CurrencyResponseInterface>
//  */

// export const getAllCurrency = async (): Promise<CurrencyResponseInterface> => {
//   const response = await fetch(
//     `${CURRENCY_BASE_URL}/currency?
//     }`
//   );
//   const data: CurrencyResponseInterface = await response.json();
//   const allCurrency = data.currency.map(({ name }) => getCurrency(name));
//   const currencies = await Promise.all(allCurrency);

//   const currency = data.currency.map((currency) => {
//     // const currencyDetail = currencyDetail.find(({ name}) => name === currency.name);

//     return {
//       ...currency,
//       // image: `${currencyDetail?.image}`,
//       // name: `${currencyDetail?.name} `,
//       // symbol: `${currencyDetail?.symbol} `,
//       // symbol_native: `${currencyDetail?.symbol_native} `,
//     };
//   });

//   return { ...data, currency };
// };
