import { Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

const Support = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={16} gap={24}>
      <BackButton />

      <View style={styles.textWrapper}>
        <Text size={24} fontWeight={700} color={colors.secondary_100}>
          Precisa de ajuda?
        </Text>
        <Text size={16}>Algum problema? Contate-nos imediatamente</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={() => router.push('/(main)/Settings/Faq')}
          style={styles.faq}
        >
          <Text size={16} fontWeight={500} color={colors.secondary_100}>
            FAQ
          </Text>

          <IconComponent name="QuestIcon" />
        </Pressable>

        <Pressable
          onPress={() =>
            router.push({ pathname: '/(main)/Home/Report', params: { id } })
          }
          style={styles.buttonReport}
        >
          <Text size={16} fontWeight={500} color={colors.error_60}>
            Denunciar motorista
          </Text>
          <IconComponent name="InfoAlertIcon" />
        </Pressable>
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    width: '100%',
    gap: 8,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 24,
    gap: 16,
  },
  faq: {
    flexDirection: 'row',
    width: '100%',
    height: 58,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.secondary_20,
    borderRadius: 8,
  },
  buttonReport: {
    flexDirection: 'row',
    width: '100%',
    height: 58,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.error_60,
    borderRadius: 8,
    backgroundColor: colors.error_40,
  },
});

export default Support;
