import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

import { Button } from '@/components/Button/Button';

import { handleError } from '@/utils/handleError';

type Props = {
  pixCode: string;
};

const MethodPix = ({ pixCode }: Props) => {
  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(pixCode);
    } catch (err) {
      handleError('Não foi possível copiar o código');
    }
  };

  return (
    <View style={styles.pixWrapper}>
      <View style={styles.qrCodeWrapper}>
        <QRCode size={132} value={pixCode} />
      </View>

      <Button onPress={handleCopy} outline style={styles.copyButton}>
        Copiar código
      </Button>
    </View>
  );
};

export default MethodPix;

const styles = StyleSheet.create({
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
});
