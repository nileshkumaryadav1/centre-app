import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import Navbar from "@/components/navigation/Navbar";
import MobileNavBar from "@/components/navigation/MobileNavBar";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Slot />
      </View>
      <MobileNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
  },
});
