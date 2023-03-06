import React, {
  useState,
  PropsWithChildren,
  useContext as _useContext,
  useMemo,
} from "react";
import { CurrencyInterface } from "../../types/types";

// Declaring the state object globally.
const CurrencyContext = React.createContext<{
  currencies: CurrencyInterface[];
  currency: CurrencyInterface | null;
  setCurrencies: React.Dispatch<React.SetStateAction<CurrencyInterface[]>>;
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyInterface | null>>;
}>({
  currency: null,
  currencies: [],
  setCurrency: () => {},
  setCurrencies: () => {},
});

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currencies, setCurrencies] = useState<CurrencyInterface[]>([]);
  const [currency, setCurrency] = useState<CurrencyInterface | null>(null);

  const state = useMemo(
    () => ({
      currency,
      currencies,
      setCurrency,
      setCurrencies,
    }),
    [currency, currencies]
  );

  // App component that provides initial context values
  return (
    <CurrencyContext.Provider value={state}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useContext = () => {
  const state = _useContext(CurrencyContext);
  return state;
};
