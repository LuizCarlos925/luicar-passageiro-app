import { CreditCardImg } from '@/assets/images';

import Text from '@/components/Text/Text';

import { theme } from '@/global/theme';

import { getCardFlag } from '@/utils/creditCardFlag';

import { CardImage, Container } from './styles';

interface Props {
  number: string;
  holderName: string;
}

export const CreditCard = ({
  number = '',
  holderName = 'Nome do titular',
}: Props) => {
  const firstDigits = number?.slice(0, 4)?.padEnd(4, '0');
  const secondDigits = number?.slice(4, 9)?.padEnd(4, '0');
  const thirdDigits = number?.slice(9, 14)?.padEnd(4, '0');
  const fourthDigits = number?.slice(14, 19)?.padEnd(4, '0');

  return (
    <Container>
      <CardImage source={CreditCardImg} contentFit="contain" />
      {getCardFlag(number, theme.colors.neutro_00, {
        position: 'absolute',
        top: 20,
        right: 20,
      })}
      <Text
        size={28}
        color={theme.colors.neutro_00}
        style={{ position: 'absolute', alignSelf: 'center', bottom: 60 }}
      >
        {firstDigits} {secondDigits} {thirdDigits} {fourthDigits}
      </Text>
      <Text
        size={16}
        color={theme.colors.neutro_00}
        style={{ position: 'absolute', left: 25, bottom: 20 }}
      >
        {holderName}
      </Text>
    </Container>
  );
};
