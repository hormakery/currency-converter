import React, { PropsWithChildren, useState, useContext } from "react";

type CurrencyType = {
  label: string;
  key: string;
  value: string;
};
// Declaring the state object globally.
const CurrencyContext = React.createContext<{
  currency: CurrencyType | null;
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyType | null>>;
}>({ currency: null, setCurrency: () => {} });

type ContextState = typeof CurrencyContext;

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyType | null>(null);

  // App component that provides initial context values
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);
  return { currency, setCurrency };
};
