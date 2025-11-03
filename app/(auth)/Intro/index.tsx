import Animated from 'react-native-reanimated';
// import { PointIntro, SeIntro, YIntro, YuIntro } from '@/assets';
import { useAnimatedStyles, useIntroAnimations } from '@/hooks/useAnimations';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { GradientContainer, LogoWrapper } from './styles';

const Intro = () => {
  const { isAuthenticated } = useAuth();

  const [hasFinishedAnimation, setHasFinishedAnimation] = useState(false);

  const animations = useIntroAnimations();
  const styles = useAnimatedStyles(animations);

  useEffect(() => {
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

  return (
    <GradientContainer>
      <Animated.View style={[styles.yAnimatedStyle]}>
        {/* <YIntro /> */}
        <Animated.View
          style={[
            styles.pointAnimatedStyle,
            {
              position: 'absolute',
              right: 0,
              bottom: 0,
            },
          ]}
        >
          {/* <PointIntro /> */}
        </Animated.View>
      </Animated.View>
      <LogoWrapper style={styles.logoAnimatedStyle}>
        <Animated.View style={styles.yuAnimatedStyle}>
          {/* <YuIntro /> */}
        </Animated.View>
        <Animated.View style={styles.seAnimatedStyle}>
          {/* <SeIntro /> */}
        </Animated.View>
      </LogoWrapper>
    </GradientContainer>
  );
};

export default Intro;
