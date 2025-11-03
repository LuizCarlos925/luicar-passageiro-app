import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';

import { Onboarding } from '@/assets/images';

import { Button } from '@/components/Button/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

const Welcome = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom + 40 }]}>
      <Image source={Onboarding} style={styles.image} />

      <Button
        onPress={() => router.push('/(auth)/SignUp/Profile')}
        style={{ marginTop: 'auto' }}
      >
        Cadastre-se
      </Button>
      <Button onPress={() => router.push('/(auth)/Login')} outline>
        Entrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    gap: 12,
  },
  image: {
    position: 'absolute',
    width,
    height,
  },
});

export default Welcome;
