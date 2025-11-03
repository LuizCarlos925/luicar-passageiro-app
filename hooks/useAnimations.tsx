import { useEffect } from 'react';
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SplashScreen } from 'expo-router';

type Animations = {
  pointOpacity: SharedValue<number>;
  yOpacity: SharedValue<number>;
  yuPositionX: SharedValue<number>;
  sePositionX: SharedValue<number>;
  yuOpacity: SharedValue<number>;
  seOpacity: SharedValue<number>;
  logoScale: SharedValue<number>;
};

const useIntroAnimations = () => {
  const pointOpacity = useSharedValue(1);
  const yOpacity = useSharedValue(1);
  const yuPositionX = useSharedValue(50);
  const sePositionX = useSharedValue(-50);
  const yuOpacity = useSharedValue(0);
  const seOpacity = useSharedValue(0);
  const logoScale = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 200);

    const pointTimeout = setTimeout(() => {
      pointOpacity.value = withSequence(
        withTiming(0, { duration: 200 }),
        withTiming(1, { duration: 200 }),
        withTiming(0, { duration: 200 }),
        withTiming(1, { duration: 200 }),
        withTiming(0, { duration: 200 }),
        withTiming(1, { duration: 200 }),
      );
    }, 0);

    const yTimeout = setTimeout(() => {
      yOpacity.value = withTiming(0, { duration: 500 });
      yuPositionX.value = withDelay(100, withTiming(0, { duration: 1000 }));
      sePositionX.value = withDelay(100, withTiming(0, { duration: 1000 }));
      yuOpacity.value = withDelay(100, withTiming(1, { duration: 1000 }));
      seOpacity.value = withDelay(100, withTiming(1, { duration: 1000 }));
    }, 1200);

    return () => {
      clearTimeout(pointTimeout);
      clearTimeout(yTimeout);
    };
  }, [
    logoScale,
    pointOpacity,
    seOpacity,
    sePositionX,
    yOpacity,
    yuOpacity,
    yuPositionX,
  ]);

  return {
    pointOpacity,
    yOpacity,
    yuPositionX,
    sePositionX,
    yuOpacity,
    seOpacity,
    logoScale,
  };
};

const useAnimatedStyles = (animations: Animations) => {
  const yAnimatedStyle = useAnimatedStyle(() => ({
    opacity: animations.yOpacity.value,
  }));

  const pointAnimatedStyle = useAnimatedStyle(() => ({
    opacity: animations.pointOpacity.value,
  }));

  const yuAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animations.yuPositionX.value }],
    opacity: animations.yuOpacity.value,
  }));

  const seAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animations.sePositionX.value }],
    opacity: animations.seOpacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: animations.logoScale.value }],
  }));

  return {
    yAnimatedStyle,
    pointAnimatedStyle,
    yuAnimatedStyle,
    seAnimatedStyle,
    logoAnimatedStyle,
  };
};

export { useIntroAnimations, useAnimatedStyles };
