import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/home";
import { StackList } from "../types/navigation";
import { CurrenciesScreen } from "../screens/currencies";
import { makeUseStyles } from "../helpers/makeUseStyles";

const Stack = createNativeStackNavigator<StackList>();

export const RootScreen = () => {
  const { styles, palette } = useStyles();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Currencies"
        component={CurrenciesScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          presentation: "modal",
          headerTitleAlign: "center",
          headerTitle: () => (
            <Text style={[styles.title]}>convert {route.params.title}</Text>
          ),
          headerTitleStyle: { color: palette.primary },
          headerRight: () => (
            <TouchableOpacity onPress={navigation.goBack} style={styles.cancel}>
              <Text style={styles.title}>cancel</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const useStyles = makeUseStyles(({ layout, palette, fonts }) => ({
  title: {
    color: palette.primary,
    fontSize: fonts.size.md,
    textTransform: "capitalize",
    fontWeight: fonts.weight.full,
    fontFamily: fonts.variants.bold,
  },
  cancel: {
    padding: layout.gutter,
  },
}));
