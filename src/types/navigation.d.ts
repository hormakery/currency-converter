import { NavigationProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { PostInterface } from "./types";

export type TabScreenList = {
  Converter: undefined;
  Calculator: undefined;
};

export type StackList = {
  Home: undefined;
};

export type RootStackScreenProps<Screen extends keyof StackList> =
  NativeStackScreenProps<StackList, Screen>;

export type RootTabScreenProps<Screen extends keyof TabScreenList> =
  NativeStackScreenProps<TabScreenList, Screen>;
