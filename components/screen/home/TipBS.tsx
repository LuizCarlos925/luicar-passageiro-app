import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import { IconComponent } from '@/components/Icon/Icon';

import { shadow } from '@/global/shadow';
import { colors } from '@/global/theme';
import { useState } from 'react';
import { getCardFlagList } from '@/utils/creditCardFlag';
import { handleError } from '@/utils/handleError';
import { useRouter } from 'expo-router';
import { formatCurrency } from '@/utils/format';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import PaymentMethod from './PaymentMethod';

type Props = {
  rideId?: number;
  value?: number;
  onClose: () => void;
  onSubmit: () => void;
};

const TipBS = ({ rideId, onClose, value, onSubmit }: Props) => {
  const { bottom } = useSafeAreaInsets();

  const router = useRouter();

  const { user } = useAuth();

  const [method, setMethod] = useState<'creditCard' | 'pix'>('creditCard');

  const card = user?.passenger?.cards?.[0];

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync('dasda');
    } catch (err) {
      handleError('Não foi possível copiar o código');
    }
  };

  const handlePayment = async () => {
    try {
      const { data } = await api.post('/sendTripAdditional', {
        tripId: rideId,
        paymentMethod: method === 'pix' ? '2' : '1',
        card: method === 'creditCard' ? { id: card?.id } : undefined,
        value,
        portion: '1',
      });

      const pixCode = data.response.pixCopiaECola || 'dsadsads';

      await Clipboard.setStringAsync(pixCode);

      onClose();
      onSubmit();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <BottomSheetView style={[styles.container, { paddingBottom: bottom + 20 }]}>
      <View>
        <View style={styles.row}>
          <Text size={20} fontWeight={700}>
            Informe o valor da gorjeta
          </Text>

          <IconComponent
            name="CloseIcon"
            onPress={onClose}
            size={16}
            style={{ padding: 8 }}
          />
        </View>

        <View style={styles.row}>
          <Text size={16}>Valor máximo:</Text>
          <Text size={16}>R$30,00</Text>
        </View>
      </View>

      <Divider />

      <View style={styles.valueWrapper}>
        <Text size={24} fontWeight={500}>
          {formatCurrency(value || 0)}
        </Text>
      </View>

      <View>
        <Text size={16} fontWeight={600}>
          Forma de pagamento
        </Text>
        <Text color={colors.secondary_60}>
          Selecione a melhor forma de pagamento para você
        </Text>
      </View>

      <View style={styles.row}>
        <PaymentMethod
          type="creditCard"
          isSelected={method === 'creditCard'}
          onPress={() => setMethod('creditCard')}
        />

        <PaymentMethod
          type="pix"
          isSelected={method === 'pix'}
          onPress={() => setMethod('pix')}
        />
      </View>

      {method === 'creditCard' && card?.id && (
        <View style={styles.creditCard}>
          {getCardFlagList(card?.brand)}

          <Text color={colors.secondary_100} style={styles.text}>
            {card?.name}{' '}
            <Text fontWeight={700} color={colors.secondary_100}>
              **** {card?.lastDigits}
            </Text>
          </Text>

          <IconComponent
            name="SwitchIcon"
            onPress={() => router.push('/(main)/Settings/CreditCard')}
          />
        </View>
      )}

      {method === 'pix' && (
        <View style={styles.pixWrapper}>
          <View style={styles.qrCodeWrapper}>
            <QRCode size={132} value="dasda" />
          </View>

          <Button onPress={handleCopy} outline style={styles.copyButton}>
            Copiar código
          </Button>
        </View>
      )}

      <Button onPress={handlePayment} style={{ opacity: method ? 1 : 0.7 }}>
        Pagar bonificação para motorista
      </Button>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
    backgroundColor: colors.neutro_00,
    ...shadow.default,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    gap: 8,
  },
  textWrapper: {
    flex: 1,
    gap: 4,
  },
  paymentWrapper: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.secondary_20,
  },
  valueWrapper: {
    width: '100%',
    minHeight: 82,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary_100,
    backgroundColor: colors.primary_10,
  },
  creditCard: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary_20,
  },
  pixWrapper: {
    alignItems: 'center',
    gap: 16,
  },
  qrCodeWrapper: {
    overflow: 'hidden',
    width: 132,
    height: 132,
    borderRadius: 12,
  },
  copyButton: {
    width: 180,
  },
  text: {
    flex: 1,
  },
});

export default TipBS;
