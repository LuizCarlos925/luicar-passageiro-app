import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useAuth } from '@/hooks/useAuth';

const Intro = () => {
  const { isAuthenticated } = useAuth();

  const [hasFinishedAnimation, setHasFinishedAnimation] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
    setTimeout(() => {
      setHasFinishedAnimation(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (hasFinishedAnimation) {
      if (isAuthenticated) {
        router.replace('/(main)/Home');
      } else {
        router.push('/(auth)/Welcome');
      }
    }
  }, [hasFinishedAnimation]);

  return <View />;
};

export default Intro;
