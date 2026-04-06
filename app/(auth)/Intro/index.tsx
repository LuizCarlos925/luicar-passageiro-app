import { useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';

import { useAuth } from '@/hooks/useAuth';
import { SplashLottie } from '@/assets/animations';
import { height, width } from '@/global/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Intro = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { top, bottom, left, right } = useSafeAreaInsets();

  const animation = useRef<LottieView>(null);

  const [hasFinishedAnimation, setHasFinishedAnimation] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (hasFinishedAnimation) {
      if (isAuthenticated) {
        router.replace('/(main)/Home');
      } else {
        router.push('/(auth)/Welcome');
      }
    }
  }, [hasFinishedAnimation, isAuthenticated, router]);

  return (
    <LottieView
      autoPlay
      ref={animation}
      source={SplashLottie as { uri: string }}
      style={{
        width: width + left + right,
        height: height + top + bottom,
        alignSelf: 'center',
      }}
      onAnimationFinish={() => setHasFinishedAnimation(true)}
      loop={false}
    />
  );
};

export default Intro;
