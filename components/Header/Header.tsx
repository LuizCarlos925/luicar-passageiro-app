import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Text from '@/components/Text/Text';

import BackButton from '@/components/BackButton/BackButton';

import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';

import { Image } from 'expo-image';
import { HeaderBg } from '@/assets/images';
import { StyleSheet } from 'react-native';
import { width } from '@/global/constants';
import { JSX } from 'react';
import { Container } from './styles';

export interface IHeaderProps {
  title?: string;
  hasBackButton?: boolean;
  onBackPress?: () => void;
  component?: JSX.Element;
}

export const Header = ({
  title,
  hasBackButton,
  onBackPress,
  component,
}: IHeaderProps) => {
  const { top } = useSafeAreaInsets();

  const handleBack = () => {
    if (onBackPress) {
      return onBackPress();
    }
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <Container style={[{ paddingTop: top }, shadow.default]}>
      <Image source={HeaderBg} style={styles.image} />

      {hasBackButton && <BackButton onPress={handleBack} />}

      {title && (
        <Text
          fontWeight={700}
          size={24}
          color={theme.colors.neutro_00}
          style={{ lineHeight: 26 }}
        >
          {title}
        </Text>
      )}

      {component}
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    width,
    height: '100%',
  },
});
