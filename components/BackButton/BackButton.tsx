import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ChevronLeftIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';
import { colors } from '@/global/theme';

interface IBackButtonProps {
  title?: string;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

const BackButton = ({
  title,
  size = 20,
  color = colors.secondary_60,
  onPress,
  style,
}: IBackButtonProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          return onPress();
        }
        router.back();
      }}
      style={[styles.container, { paddingTop: top }, style]}
    >
      <ChevronLeftIcon
        width={size - 4}
        height={size - 4}
        color={color}
        style={styles.icon}
      />

      {title && (
        <Text size={size} fontWeight={700} color={color} style={styles.text}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 20,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  icon: {
    position: 'absolute',
    left: 4,
    bottom: 14,
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
});

export default BackButton;
