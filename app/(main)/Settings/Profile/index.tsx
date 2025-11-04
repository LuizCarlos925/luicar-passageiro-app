import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import { SettingsHeaderIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { IconComponent } from '@/components/Icon/Icon';
import BackButton from '@/components/BackButton/BackButton';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';
import { GlobalContainer } from '@/components/Container/Container';
import { SwitchProfile } from '@/components/SwitchProfile/SwitchProfile';

import { width } from '@/global/constants';
import { colors, theme } from '@/global/theme';

import { useModal } from '@/hooks/useModal';

import { handleError } from '@/utils/handleError';

import { AddressForm, ProfileForm } from '@/validation/Profile.validation';

import {
  Column,
  ContentWrapper,
  HeaderWrapper,
  ProfileButton,
  Row,
} from './styles';

const Profile = () => {
  const { setModal } = useModal();

  const [section, setSection] = useState('profile');
  const [avatarUri, setAvatarUri] = useState(
    'https://randomuser.me/api/portraits/men/75.jpg',
  );

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <GlobalContainer
      alignItems="flex-start"
      statusBarTextColor="light"
      withoutPaddingTop
    >
      <HeaderWrapper>
        <SettingsHeaderIcon width={width} style={{ marginTop: -width * 0.2 }} />

        <BackButton
          color={theme.colors.neutro_00}
          style={{ position: 'absolute', zIndex: 2, top: 40, left: 16 }}
        />

        <Row
          style={{ position: 'absolute', bottom: -50, paddingHorizontal: 16 }}
        >
          <ProfileButton
            onPress={() =>
              setModal({
                name: 'avatar',
                onPress: handlePickImage,
                onPressBack: handleTakePhoto,
              })
            }
          >
            <AvatarImage uri={avatarUri} size={116} style={styles.avatar} />

            <IconComponent
              name={avatarUri ? 'Trash2Icon' : 'EditIcon'}
              size={16}
              color={colors.neutro_00}
              onPress={
                avatarUri
                  ? () => setAvatarUri('')
                  : () =>
                      setModal({
                        name: 'avatar',
                        onPress: handlePickImage,
                        onPressBack: handleTakePhoto,
                      })
              }
              style={styles.avatarBtn}
            />
          </ProfileButton>

          <Column>
            <Row>
              <Text
                size={16}
                fontWeight={600}
                color={colors.secondary_100}
                style={{ flexShrink: 1 }}
              >
                Gabriel Souza Lima
              </Text>
              <Text color={colors.secondary_40}>{`\u2022`}</Text>

              <IconComponent name="StarIcon" color={colors.primary_100} />
              <Text size={16} fontWeight={600}>
                4.0
              </Text>
            </Row>
          </Column>
        </Row>
      </HeaderWrapper>

      <ContentWrapper>
        <SwitchProfile selected={section} setSelected={setSection} />

        {section === 'profile' && <BodyProfile />}
        {section === 'address' && <BodyAddress />}
      </ContentWrapper>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: theme.colors.neutro_00,
  },
  avatarBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.colors.neutro_00,
    backgroundColor: theme.colors.primary_100,
  },
});

export default Profile;

const BodyProfile = () => {
  const { setModal } = useModal();

  const { control, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: 'Gabriel Souza Lima',
      social_name: '',
      cpf: '044.333.650-41',
      phone: '(11) 98588-8585',
    },
  });

  const onSubmit = async (form: ProfileForm) => {
    try {
      setModal({ name: 'updateSuccess' });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <View style={{ width: '100%', gap: 4 }}>
      <Input
        name="name"
        control={control}
        label="Nome completo"
        editable={false}
      />
      <Input
        name="social_name"
        control={control}
        label="Nome social (opcional)"
        placeholder="Digite seu nome social"
        autoCapitalize="words"
        editable={false}
      />
      <Input
        name="cpf"
        control={control}
        label="CPF"
        placeholder="Digite seu CPF"
        type="cpf"
        editable={false}
        iconColor={theme.colors.primary_100}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Input
          name="phone"
          control={control}
          label="Telefone"
          type="cel-phone"
          editable
          width="90%"
        />

        <IconComponent
          name="EditIcon"
          size={18}
          color={colors.secondary_60}
          style={{ marginTop: 16 }}
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)} style={{ marginVertical: 30 }}>
        Salvar alterações
      </Button>
    </View>
  );
};

const BodyAddress = () => {
  const { control } = useForm<AddressForm>({
    defaultValues: {
      zipCode: '08695-430',
      state: 'SP',
      district: 'Jardim Graziela',
      street: 'Rua Manoel Felix da Silva',
      number: '300',
      complement: 'Apto 12',
    },
  });

  return (
    <View style={{ width: '100%', gap: 4 }}>
      <Input
        name="zipCode"
        control={control}
        label="CEP"
        placeholder="Digite seu CEP"
        type="zip-code"
        editable={false}
      />
      <Input
        name="street"
        control={control}
        label="Rua"
        placeholder="Digite sua rua"
        autoCapitalize="words"
        editable={false}
      />

      <Input
        name="district"
        control={control}
        label="Bairro"
        placeholder="Digite seu bairro"
        autoCapitalize="words"
        editable={false}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Input
          name="number"
          control={control}
          label="Número"
          placeholder="Digite o número"
          type="only-numbers"
          editable={false}
          width="48%"
        />
        <Input
          name="state"
          control={control}
          label="Estado"
          placeholder="Digite seu estado"
          autoCapitalize="words"
          editable={false}
          width="48%"
        />
      </View>
      <Input
        name="complement"
        control={control}
        label="Complemento (opcional)"
        placeholder="Digite o complemento"
        autoCapitalize="words"
        editable={false}
      />
    </View>
  );
};
