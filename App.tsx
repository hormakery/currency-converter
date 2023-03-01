import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Navigation } from "./src/navigation";
import { Providers } from "./src/providers";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Providers>
        <Navigation />
      </Providers>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
