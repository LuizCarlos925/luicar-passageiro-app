import React from 'react';
import { router } from 'expo-router';

import { shadow } from '@/global/shadow';

import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/global/theme';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconComponent, IconT } from '../Icon/Icon';

export type ITab = 'History' | 'Home' | 'Settings';
const tabStacks = ['History', 'Home', 'Settings'];

const tabIcons: Record<string, IconT> = {
  History: 'TabbarHistory',
  Home: 'TabbarHome',
  Settings: 'TabbarSettings',
};

interface ITabBarProps {
  currentScreen: ITab;
}

export const TabBar = ({ currentScreen }: ITabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  const handleNavigate = (routeName: string) => {
    if (router.canDismiss()) {
      router.dismissTo(`${routeName}` as any);
    } else {
      router.push(`${routeName}` as any);
    }
  };

  return (
    <View style={[styles.container, { bottom: 16 + bottom }]}>
      {tabStacks.map(route => {
        const isFocused = currentScreen === route;
        return (
          <Pressable
            key={route}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : undefined}
            onPress={() => handleNavigate(route)}
            style={styles.button}
          >
            <View style={isFocused ? styles.selected : undefined}>
              <IconComponent
                name={tabIcons[route]}
                size={20}
                color={isFocused ? colors.primary_100 : colors.neutro_80}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    width: '80%',
    height: 68,
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: colors.primary_100,
    ...shadow.default,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    backgroundColor: colors.primary_10 + 50,
  },
});
