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

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

import { useRatingPassenger } from '@/services/Settings/rating.service';

import { handleError } from '@/utils/handleError';

import { AddressForm, ProfileForm } from '@/validation/Profile.validation';

import { IUser } from '@/interfaces/user';
import { api } from '@/services/api';
import {
  Column,
  ContentWrapper,
  HeaderWrapper,
  ProfileButton,
  Row,
} from './styles';

const Profile = () => {
  const { user, refetchUser } = useAuth();

  const { setModal } = useModal();

  const userAvatar = user.passenger?.image?.url || '';

  const [section, setSection] = useState('profile');
  const [avatarUri, setAvatarUri] = useState(userAvatar);

  const { data: rating } = useRatingPassenger(user?.passenger?.id);

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
        const formData = new FormData();

        formData.append('ref', 'api::passenger.passenger');
        formData.append('refId', user?.passenger?.id?.toString());
        formData.append('field', 'image');
        formData.append('files', {
          uri: result?.assets?.[0]?.uri,
          name: result?.assets?.[0]?.uri?.split('/')?.pop() as string,
          type: 'image/jpg',
        });

        await api.post('/upload', formData);

        refetchUser();
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
                {user?.passenger?.socialName || user?.passenger?.name}
              </Text>
              <Text color={colors.secondary_40}>{`\u2022`}</Text>

              <IconComponent name="StarIcon" color={colors.primary_100} />
              <Text size={16} fontWeight={600}>
                {rating?.averageRating || 0}
              </Text>
            </Row>
          </Column>
        </Row>
      </HeaderWrapper>

      <ContentWrapper>
        <SwitchProfile selected={section} setSelected={setSection} />

        {section === 'profile' && <BodyProfile user={user} />}
        {section === 'address' && <BodyAddress user={user} />}
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

type Props = {
  user: IUser;
};

const BodyProfile = ({ user }: Props) => {
  const { refetchUser } = useAuth();

  const { setModal } = useModal();

  const { control, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.passenger?.name,
      social_name: user?.passenger?.socialName,
      cpf: user?.passenger?.cpf,
      phone: user?.passenger?.phone,
    },
  });

  const onSubmit = async (form: ProfileForm) => {
    try {
      await api.put('/updatePassenger', {
        personalData: {
          phone: form.phone,
        },
      });

      refetchUser();

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

const BodyAddress = ({ user }: Props) => {
  const { control } = useForm<AddressForm>({
    defaultValues: {
      zipCode: user?.passenger?.zipCode,
      state: user?.passenger?.state,
      city: user?.passenger?.city,
      district: user?.passenger?.neighborhood,
      street: user?.passenger?.address,
      number: user?.passenger?.number,
      complement: user?.passenger?.complement || undefined,
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
