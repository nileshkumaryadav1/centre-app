import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Feather, FontAwesome, Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { label: "Home", route: "/", icon: <Feather name="home" size={20} color="#000" /> },
    { label: "Services", route: "/services", icon: <Entypo name="list" size={20} color="#000" /> },
    { label: "Calendar", route: "/calendar", icon: <FontAwesome name="calendar" size={20} color="#000" /> },
    { label: "Blog", route: "/blog", icon: <Feather name="edit-2" size={20} color="#000" /> },
    { label: "Members", route: "/members", icon: <Feather name="users" size={20} color="#000" /> },
  ];

  return (
    <>
      <View style={styles.navbar}>
        <Text style={styles.logo}>CENTRE☠️</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Feather name={menuOpen ? "x" : "menu"} size={28} color="#00AEEF" />
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <View style={styles.drawer}>
          <ScrollView>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.route}
                style={[
                  styles.menuItem,
                  pathname === item.route && styles.activeItem,
                ]}
                onPress={() => {
                  router.push(item.route);
                  closeMenu();
                }}
              >
                {item.icon}
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00AEEF",
  },
  drawer: {
    position: "absolute",
    top: 60,
    left: 0,
    width: width * 0.75,
    height: "100%",
    backgroundColor: "#f8f8f8",
    zIndex: 999,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 10,
  },
  activeItem: {
    backgroundColor: "#00AEEF",
  },
  menuLabel: {
    color: "#000",
    fontSize: 16,
  },
});
