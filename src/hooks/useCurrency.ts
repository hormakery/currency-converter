import { useEffect, useState } from "react";
import { BasicError } from "../types/types";
import { getCurrencies } from "../network/currency";
import { useContext } from "../providers/ContextProvider";

export const useCurrency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currencies, setCurrencies } = useContext();
  const [error, setError] = useState<BasicError | null>(null);

  const fetchCurrencies = async () => {
    try {
      setIsLoading(true);
      const currencies = await getCurrencies();
      setCurrencies(currencies);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currencies.length) {
      fetchCurrencies();
    }
  }, [currencies]);

  return {
    error,
    isLoading,
    currencies,
  };
};
