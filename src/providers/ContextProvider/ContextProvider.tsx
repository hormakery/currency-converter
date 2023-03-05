import React, {
  useState,
  PropsWithChildren,
  useContext as _useContext,
} from "react";
import { CurrencyInterface } from "../../types/types";

// Declaring the state object globally.
const CurrencyContext = React.createContext<{
  currency: CurrencyInterface | null;
  setCurrency: React.Dispatch<React.SetStateAction<CurrencyInterface | null>>;
}>({ currency: null, setCurrency: () => {} });

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyInterface | null>(null);

  // App component that provides initial context values
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useContext = () => {
  const { currency, setCurrency } = _useContext(CurrencyContext);
  return { currency, setCurrency };
};
