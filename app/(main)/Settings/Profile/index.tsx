import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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

import { api } from '@/services/api';
import { deleteImage, uploadImage } from '@/services/images.service';
import { useRatingPassenger } from '@/services/Settings/rating.service';

import { handleError } from '@/utils/handleError';

import { AddressForm, ProfileForm } from '@/validation/Profile.validation';

import { IUser } from '@/interfaces/user';

const Profile = () => {
  const { user, refetchUser } = useAuth();

  const { setModal } = useModal();

  const userAvatar = user.passenger?.image?.url || '';

  const [section, setSection] = useState('profile');

  const { data: rating } = useRatingPassenger(user?.passenger?.id);

  const handleSaveAvatar = async (uri: string) => {
    try {
      await uploadImage({
        ref: 'api::passenger.passenger',
        refId: user?.passenger?.id?.toString() || '',
        field: 'image',
        uri,
      });

      refetchUser();
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteImage(user?.passenger?.image?.id || 0);

      refetchUser();

      setModal({ name: 'deleteAvatar' });
    } catch (err) {
      handleError(err);
    }
  };

  const handleChangeAvatar = async () => {
    setModal({
      name: 'avatar',
      onPress: handleTakePhoto,
      onPressBack: handlePickImage,
    });
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      handleSaveAvatar(result?.assets?.[0]?.uri || '');
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      handleSaveAvatar(result?.assets?.[0]?.uri || '');
    }
  };

  return (
    <GlobalContainer
      alignItems="flex-start"
      statusBarTextColor="light"
      withoutPaddingTop
    >
      <View style={styles.headerWrapper}>
        <SettingsHeaderIcon
          width={width}
          style={{ marginTop: -width * 0.2 }}
          preserveAspectRatio="xMidYMid slice"
        />

        <BackButton
          color={theme.colors.neutro_00}
          style={{ position: 'absolute', zIndex: 2, top: 40, left: 16 }}
        />

        <View style={styles.avatarRow}>
          <Pressable onPress={handleChangeAvatar}>
            <AvatarImage uri={userAvatar} size={116} style={styles.avatar} />

            <IconComponent
              name={userAvatar ? 'Trash2Icon' : 'EditIcon'}
              size={16}
              color={colors.neutro_00}
              onPress={userAvatar ? handleDeleteAvatar : handleChangeAvatar}
              style={styles.avatarBtn}
            />
          </Pressable>

          <View style={styles.column}>
            <View style={styles.row}>
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
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <SwitchProfile selected={section} setSelected={setSection} />

        {section === 'profile' && <BodyProfile user={user} />}
        {section === 'address' && <BodyAddress user={user} />}
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    marginBottom: 60,
  },
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
  avatarRow: {
    position: 'absolute',
    bottom: -50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  column: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 52,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    gap: 16,
  },
});

export default Profile;

type Props = {
  user: IUser;
};

const BodyProfile = ({ user }: Props) => {
  const { refetchUser } = useAuth();

  const { setModal } = useModal();

  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.passenger?.name,
      social_name: user?.passenger?.socialName || '',
      cpf: user?.passenger?.cpf,
      phone: user?.passenger?.phone,
    },
  });

  const onSubmit = async (form: ProfileForm) => {
    setIsEditing(false);
    try {
      await api.put('/updatePassenger', {
        personalData: {
          phone: form.phone,
          socialName: form.social_name,
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
          editable={isEditing}
          containerStyle={{
            borderColor: isEditing ? colors.primary_100 : colors.secondary_20,
          }}
          width="90%"
        />

        <IconComponent
          name="EditIcon"
          size={18}
          color={colors.secondary_60}
          style={{ marginTop: 28 }}
          onPress={() => setIsEditing(prev => !prev)}
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
      <Input
        name="city"
        control={control}
        label="Cidade"
        placeholder="Digite sua cidade"
        autoCapitalize="words"
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
