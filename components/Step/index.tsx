/* eslint-disable react/no-array-index-key */
import { colors } from '@/global/theme';
import { StyleSheet, View } from 'react-native';

type Props = {
  currentStep: number;
  max?: number;
};

export const Step = ({ currentStep, max = 3 }: Props) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: max }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            {
              backgroundColor:
                index < currentStep ? colors.primary_100 : colors.primary_20,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  step: {
    flex: 1,
    height: 6,
    backgroundColor: colors.primary_20,
  },
});
