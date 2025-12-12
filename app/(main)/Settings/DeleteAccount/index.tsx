import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { LogoWhiteIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import { IconComponent } from '@/components/Icon/Icon';
import { ModalDeleteAccount } from '@/components/screen';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';
import { DeleteAccountForm } from '@/validation/DeleteAccount.validation';

const DeleteAccount = () => {
  const router = useRouter();

  const { logout } = useAuth();
  const { setModal } = useModal();

  const [isVisible, setIsVisible] = useState(false);

  const handleDeleteAccount = async (form: DeleteAccountForm) => {
    try {
      setIsVisible(false);

      await api.delete(`/deleteUser/${form.password}`);

      setModal({
        name: 'deleteAccountSuccess',
        onPress: logout,
        onPressBack: logout,
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <GlobalContainer
      paddingHorizontal={16}
      containerStyle={{ backgroundColor: colors.primary_100 }}
    >
      <LogoWhiteIcon width={width} height={52} />

      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <IconComponent name="WarningIcon" />
        </View>
        <Text size={20} fontWeight={700} color={colors.primary_100}>
          Atenção!
        </Text>

        <Text size={16} fontWeight={700} color={colors.secondary_100}>
          Você está prestes a excluir permanentemente sua conta na plataforma
        </Text>

        <Text>
          Essa ação é definitiva e irreversível, ao confirmá-la, todas as suas
          informações serão removidas dos nossos sistemas, incluindo:
        </Text>

        <Text>
          {`\u2022`} Dados pessoais e de acesso{'\n'}
          {`\u2022`} Histórico de atividades{'\n'}
          {`\u2022`} Preferências e configurações{'\n'}
          {`\u2022`} Conteúdos e registros vinculados à sua conta
        </Text>

        <Text>
          Após a exclusão, não será possível recuperar nenhum dado ou restaurar
          o acesso.
        </Text>

        <Text size={16} fontWeight={600} color={colors.secondary_100}>
          Tem certeza que deseja continuar?
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          onPress={router.back}
          backgroundColor={colors.neutro_00}
          fontColor={colors.primary_100}
        >
          Continuar usando plataforma
        </Button>
        <Button onPress={() => setIsVisible(true)}>Excluir conta</Button>
      </View>

      <ModalDeleteAccount
        isVisible={isVisible}
        onPress={handleDeleteAccount}
        onBackPress={() => setIsVisible(false)}
      />
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 'auto',
    padding: 24,
    gap: 8,
    borderRadius: 16,
    backgroundColor: colors.neutro_00,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: colors.primary_20,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 32,
  },
});

export default DeleteAccount;
