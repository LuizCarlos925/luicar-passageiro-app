/* eslint-disable no-useless-escape */
import { StyleSheet, View } from 'react-native';
import { colors, theme } from '@/global/theme';
import Text from '@/components/Text/Text';

type Props = {
  password?: string;
};

const PasswordValidation = ({ password }: Props) => {
  const hasMinimum = password && password.length >= 8;
  const hasUppercase = password?.match(/^(?=.*[A-Z])/);
  const hasLowercase = password?.match(/^(?=.*[a-z])/);
  const hasSpecialChars = password?.match(
    /^(?=.*[!@#\$%\^&\*\.\;\_\=\+\-\:\,\<\>\?\|\/])/,
  );

  return (
    <View style={styles.passwordRulesWrapper}>
      <Text fontWeight={500} color={theme.colors.gray_1e}>
        Requisitos para a senha:
      </Text>

      <Text
        color={hasMinimum ? theme.colors.primary_100 : theme.colors.gray_1e}
      >
        • Mínimo de 8 caracteres
      </Text>
      <Text
        color={hasUppercase ? theme.colors.primary_100 : theme.colors.gray_1e}
      >
        • 1 letra maiúscula
      </Text>
      <Text
        color={hasLowercase ? theme.colors.primary_100 : theme.colors.gray_1e}
      >
        • 1 letra minúscula
      </Text>
      <Text
        color={
          hasSpecialChars ? theme.colors.primary_100 : theme.colors.gray_1e
        }
      >
        • 1 caractere especial
      </Text>
    </View>
  );
};

export default PasswordValidation;

const styles = StyleSheet.create({
  passwordRulesWrapper: {
    width: '100%',
    padding: 12,
    gap: 5,
    borderRadius: 15,
    backgroundColor: colors.primary_20,
  },
});
