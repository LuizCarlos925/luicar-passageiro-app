import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Text from '@/components/Text/Text';
import { Trail } from '@/components/screen';
import BackButton from '@/components/BackButton/BackButton';
import { CardDriver } from '@/components/CardDriver/CardDriver';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { formatCurrency } from '@/utils/format';

import { IconComponent } from '@/components/Icon/Icon';
import { Image } from 'expo-image';
import { Car1 } from '@/assets/images';

const TripDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={20} gap={16}>
      <BackButton style={styles.backButton} />

      <Text size={24} fontWeight={700}>
        Detalhes da corrida
      </Text>

      <CardDriver
        driver={{
          image: { url: 'https://randomuser.me/api/portraits/men/16.jpg' },
        }}
      />
      <View style={styles.tag}>
        <IconComponent name="DiamondIcon" size={12} color={colors.neutro_00} />
        <Text size={12} fontWeight={600}>
          DIAMANTE
        </Text>
      </View>

      <View style={styles.line} />

      <View style={styles.wrapper}>
        <Text size={12} fontWeight={500} color={colors.secondary_100}>
          Valor
        </Text>

        <Text size={20} fontWeight={600} color={colors.secondary_100}>
          {formatCurrency(150)}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.wrapper, { minWidth: '60%' }]}>
          <Text fontWeight={500} color={colors.secondary_60}>
            Forma de pagamento
          </Text>
          <Text size={12} color={colors.secondary_60}>
            Dinheiro
          </Text>
        </View>

        <View style={styles.wrapper}>
          <Text fontWeight={500} color={colors.secondary_60}>
            Data
          </Text>
          <Text size={12} color={colors.secondary_60}>
            27/08/2025
          </Text>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.wrapper}>
        <Text size={16} fontWeight={600} color={colors.secondary_100}>
          Viagem
        </Text>
        <Text>Detalhes da viagem</Text>
      </View>

      <Trail />

      <Text size={16} fontWeight={600} color={colors.secondary_100}>
        Informações do veículo
      </Text>

      <Image source={Car1} style={styles.image} />

      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <View style={styles.wrapper}>
          <Text fontWeight={500} color={colors.secondary_60}>
            Placa
          </Text>

          <Text size={16} fontWeight={600} color={colors.primary_100}>
            QII3W20
          </Text>
        </View>

        <View style={styles.wrapper}>
          <Text fontWeight={500} color={colors.secondary_60}>
            Marca/Modelo
          </Text>

          <Text fontWeight={600}>Volkswagen Gol</Text>
        </View>

        <View style={styles.wrapper}>
          <Text fontWeight={500} color={colors.secondary_60}>
            Cor
          </Text>

          <Text fontWeight={600}>Vermelho</Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.dismissTo('/(main)/Home/Report')}
        style={styles.buttonReport}
      >
        <Text size={14} color={colors.error_60}>
          Denunciar motorista
        </Text>
        <IconComponent name="InfoAlertIcon" />
      </Pressable>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: 16,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.secondary_20,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.secondary_20,
  },
  wrapper: {
    flexShrink: 1,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 60,
    height: 40,
  },
  buttonReport: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.error_60,
    borderRadius: 8,
    backgroundColor: '#fffbf8',
  },
});

export default TripDetails;
