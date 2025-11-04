import React from 'react';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';

import { colors } from '@/global/theme';

import { Container, Row, SuccessContainer } from './styles';

const TIPS = [1, 3, 5, 'Outro valor'];

type Props = {
  onPress: (value: number) => void;
  isSent?: boolean;
};

export const TipOptions = ({ onPress, isSent }: Props) => {
  if (isSent) {
    return (
      <SuccessContainer>
        {/* <CheckCircleIcon /> */}
        <Text fontWeight={500} color={colors.green_2d}>
          Gorjeta enviada
        </Text>
      </SuccessContainer>
    );
  }

  return (
    <Container>
      <Text size={16}>Adicione uma gorjeta para o motorista</Text>

      <Row>
        {TIPS?.map(item => (
          <Button
            key={item?.toString()}
            onPress={() => onPress(item)}
            style={{ width: '48%', borderRadius: 10 }}
            outline
            fontColor={colors.neutro_00}
          >
            {item === 'Outro valor' ? item : `R$ ${item},00`}
          </Button>
        ))}
      </Row>
    </Container>
  );
};
