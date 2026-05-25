import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

import { useAuth } from '@/hooks/useAuth';

const Intro = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    SplashScreen.hideAsync();

    if (isAuthenticated) {
      router.replace('/(main)/Home');
    } else {
      router.replace('/(auth)/Login');
    }
  }, [isAuthenticated, router]);

  return null;
};

export default Intro;
