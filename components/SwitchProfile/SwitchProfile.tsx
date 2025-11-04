import React from 'react';

import Text from '@/components/Text/Text';

import { theme } from '@/global/theme';

import { Container, SwitchButton } from './styles';

interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  marginTop?: number;
  marginBottom?: number;
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
  {
    id: 'bank',
    name: 'Cartão de crédito',
  },
  {
    id: 'auth',
    name: 'Acesso',
  },
];

export const SwitchProfile = ({
  selected,
  setSelected,
  marginBottom,
  marginTop,
}: Props) => {
  return (
    <Container style={{ marginTop, marginBottom }}>
      {OPTIONS?.map(item => (
        <SwitchButton
          key={item?.id}
          onPress={() => setSelected(item?.id)}
          isSelected={selected === item?.id}
        >
          <Text
            size={selected === item?.id ? 12 : 10}
            fontWeight={selected === item?.id ? 600 : 500}
            color={
              selected === item?.id
                ? theme.colors.primary_60
                : theme.colors.neutro_70
            }
          >
            {item.name}
          </Text>
        </SwitchButton>
      ))}
    </Container>
  );
};
