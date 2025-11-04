import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/Text/Text';

import { theme } from '@/global/theme';

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const OPTIONS = [
  {
    id: 'profile',
    name: 'Dados pessoais',
  },
  {
    id: 'address',
    name: 'Endereço',
  },
];

export const SwitchProfile = ({ selected, setSelected }: Props) => {
  return (
    <View style={styles.container}>
      {OPTIONS?.map(item => (
        <Pressable
          key={item?.id}
          onPress={() => setSelected(item?.id)}
          style={[
            styles.button,
            {
              backgroundColor:
                selected === item?.id
                  ? theme.colors.primary_100
                  : theme.colors.neutro_10,
            },
          ]}
        >
          <Text
            size={16}
            fontWeight={selected === item?.id ? 500 : 400}
            color={
              selected === item?.id
                ? theme.colors.neutro_00
                : theme.colors.secondary_60
            }
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 34,
  },
});
