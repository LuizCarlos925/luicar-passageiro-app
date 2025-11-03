import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Text from '@/components/Text/Text';

import BackButton from '@/components/BackButton/BackButton';

import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';

import { Container } from './styles';

export interface IHeaderProps {
  title?: string;
  hasBackButton?: boolean;
  onBackPress?: () => void;
}

export const Header = ({ title, hasBackButton, onBackPress }: IHeaderProps) => {
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
    <Container style={[{ height: top + 79, paddingTop: top }, shadow.default]}>
      {hasBackButton && <BackButton onPress={handleBack} />}

      <Text
        fontWeight={700}
        size={24}
        color={theme.colors.neutro_00}
        style={{ lineHeight: 26 }}
      >
        {title}
      </Text>
    </Container>
  );
};
