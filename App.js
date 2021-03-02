import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScanScreen from "./ScanScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: "orange",
            alignItems: "center",
            justifyContent: "center",
          }}
          centerComponent={{
            text: "Barcode Scanner",
            style: { fontSize: 20, fontStyle:'italic', },
          }}
        />
        <ScanScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
