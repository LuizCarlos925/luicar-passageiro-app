import { StyleSheet, View } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

const MethodCash = () => {
  return (
    <View style={styles.row}>
      <IconComponent name="InfoAlertIcon" />

      <Text size={12} style={{ flex: 1 }}>
        Atenção! Esteja com o valor trocado para facilitar o pagamento.
      </Text>
    </View>
  );
};

export default MethodCash;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
});
