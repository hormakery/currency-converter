import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootScreen } from "./root";
import { RootStackList } from "../types/navigation";
import { useCurrency } from "../hooks/useCurrency";
import { usePrepareApp } from "../hooks/usePrepareApp";
import { useIsDarkMode } from "../hooks/useIsDarkMode";

const Stack = createNativeStackNavigator<RootStackList>();

export const Navigation = () => {
  // make currency network calls on time before screen is ready
  const _ = useCurrency();
  const isDarkMode = useIsDarkMode();
  const { appIsReady, onAppIsReady } = usePrepareApp();

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer
      onReady={onAppIsReady}
      theme={isDarkMode ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={RootScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
