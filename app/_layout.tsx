import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
// import MobileNavbar from "@/components/navigation/MobileNavBar";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack />
      {/* <MobileNavbar /> */}
    </SafeAreaView>
  );
}
