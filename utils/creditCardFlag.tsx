import {
  BrandCreditCard,
  BrandElo,
  BrandMasterCard,
  BrandVisa,
} from '@/assets/icons';
import { theme } from '@/global/theme';
import { ViewStyle } from 'react-native';

export const getCardFlag = (
  cardNumber: string,
  color: string,
  style?: ViewStyle,
) => {
  if (/^4/.test(cardNumber)) {
    return (
      <BrandVisa
        color={color}
        width={80}
        height={80}
        style={{
          position: 'absolute',
          top: 0,
          right: 10,
        }}
      />
    );
  }
  if (/^5[1-5]/.test(cardNumber)) {
    return <BrandMasterCard color={color} style={style} />;
  }
  if (
    /^(?:4011|4312|4389|4514|4573|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(
      cardNumber,
    )
  ) {
    return <BrandElo color={color} width={60} height={40} style={style} />;
  }
  return <BrandCreditCard color={color} width={35} height={35} style={style} />;
};

export const getCardFlagList = (name?: string) => {
  if (!name) {
    return null;
  }
  if (name === 'mastercard') {
    return <BrandMasterCard width="100%" height="120%" />;
  }
  return (
    <BrandCreditCard
      width="100%"
      height="100%"
      color={theme.colors.primary_100}
    />
  );
};
