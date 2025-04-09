import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import {
  Home,
  User,
  Calendar,
  PenBox,
  BetweenHorizonalStart,
} from 'lucide-react-native';

const MobileNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const navItems = [
    { label: 'Home', icon: Home, route: '/' },
    { label: 'Services', icon: BetweenHorizonalStart, route: '/services' },
    { label: 'Calendar', icon: Calendar, route: '/calendar' },
    { label: 'Blog', icon: PenBox, route: '/blog' },
    { label: 'Members', icon: User, route: '/members' },
  ];

  return (
    <View style={[styles.navbar, isDark && styles.navbarDark]}>
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          active={pathname === item.route}
          onPress={() => router.push(item.route)}
        />
      ))}
    </View>
  );
};

const NavItem = ({ icon: Icon, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.navItem, active && styles.activeItem]}
  >
    <Icon color={active ? '#3b82f6' : '#333'} size={24} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    zIndex: 999,
  },
  navbarDark: {
    backgroundColor: '#1f2937',
    borderColor: '#444',
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
  activeItem: {
    backgroundColor: '#e0f2fe',
    borderRadius: 999,
  },
});

export default MobileNavbar;
