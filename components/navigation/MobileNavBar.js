import React from 'react';
import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Home,
  User,
  Calendar,
  PenBox,
  BetweenHorizonalStart,
} from 'lucide-react-native';

const MobileNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const currentRoute = route.name;

  return (
    <View style={[styles.navbar, isDark && styles.navbarDark]}>
      <NavItem
        label="Home"
        icon={Home}
        screen="Home"
        active={currentRoute === 'Home'}
        onPress={() => navigation.navigate('Home')}
      />
      <NavItem
        label="Services"
        icon={BetweenHorizonalStart}
        screen="Services"
        active={currentRoute === 'Services'}
        onPress={() => navigation.navigate('Services')}
      />
      <NavItem
        label="Calendar"
        icon={Calendar}
        screen="Calendar"
        active={currentRoute === 'Calendar'}
        onPress={() => navigation.navigate('Calendar')}
      />
      <NavItem
        label="Blog"
        icon={PenBox}
        screen="Blog"
        active={currentRoute === 'Blog'}
        onPress={() => navigation.navigate('Blog')}
      />
      <NavItem
        label="Members"
        icon={User}
        screen="Members"
        active={currentRoute === 'Members'}
        onPress={() => navigation.navigate('Members')}
      />
    </View>
  );
};

const NavItem = ({ icon: Icon, label, active, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.navItem,
        active && styles.activeItem,
      ]}
    >
      <Icon color={active ? '#3b82f6' : '#333'} size={24} />
    </TouchableOpacity>
  );
};

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
