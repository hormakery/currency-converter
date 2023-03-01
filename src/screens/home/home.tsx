import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Converter } from "../converter";
import { Calculator } from "../calculator";
import { makeUseStyles } from "../../helpers/makeUseStyles";
import { RootStackScreenProps, TabScreenList } from "../../types/navigation";

const Tab = createMaterialTopTabNavigator<TabScreenList>();

export const HomeScreen: React.FC<RootStackScreenProps<"Home">> = () => {
  const { styles } = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Converter" component={Converter} />
        <Tab.Screen name="Calculator" component={Calculator} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const useStyles = makeUseStyles(({ palette }) => ({
  container: { flex: 1, backgroundColor: palette.background },
}));
