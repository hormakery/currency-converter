import React, { PropsWithChildren } from "react";

import { ContextProvider } from "./ContextProvider";
import { SafeAreaProvider } from "./SafeAreaProvider";
import { StatusBarProvider } from "./StatusBarProvider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <StatusBarProvider>{children}</StatusBarProvider>
      </SafeAreaProvider>
    </ContextProvider>
  );
};
