import { useEffect, useState } from "react";
import { getCountries } from "../network/currency";
import { BasicError, CurrencyInterface } from "../types/types";

export const useCurrency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<BasicError | null>(null);
  const [currencies, setCurrencies] = useState<CurrencyInterface[]>([]);

  const fetchCurrencies = async () => {
    try {
      setIsLoading(true);
      const response = await getCountries();
      console.log(response);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return {
    error,
    isLoading,
    currencies,
  };
};
