import { useEffect, useState } from "react";
import { getCurrencies } from "../network/currency";
import { BasicError, CurrencyInterface } from "../types/types";

export const useCurrency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<BasicError | null>(null);
  const [currencies, setCurrencies] = useState<CurrencyInterface[]>([]);

  const fetchCurrencies = async () => {
    try {
      setIsLoading(true);
      const currencies = await getCurrencies();
      setCurrencies(currencies)
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
