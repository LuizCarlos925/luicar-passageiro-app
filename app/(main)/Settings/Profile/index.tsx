import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Constants from 'expo-constants';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { yupResolver } from '@hookform/resolvers/yup';

// import {
//   ClipboardIcon,
//   SettingsHeaderIcon,
//   StarIcon,
//   TrashRedIcon,
// } from '@/assets';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';
import { GlobalContainer } from '@/components/Container/Container';
import { SwitchProfile } from '@/components/SwitchProfile/SwitchProfile';

import { theme } from '@/global/theme';
import { width } from '@/global/constants';

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

import { IUser } from '@/interfaces/user';

import { api } from '@/services/api';
// import { useRatingPassenger } from '@/services/Settings/rating.service';

import { normalize } from '@/utils/format';
import { handleError, handleSuccess } from '@/utils/handleError';

import {
  AddressForm,
  BankAccountForm,
  BankAccountSchema,
  ProfileForm,
} from '@/validation/Profile.validation';

import { Pressable } from 'react-native';
import { getAdressByZipCode } from '@/services/cep';
import { Ionicons } from '@expo/vector-icons';

import {
  Column,
  ContentWrapper,
  DeleteButton,
  FlagWrapper,
  HeaderWrapper,
  ProfileButton,
  Row,
} from './styles';

const labelStyle = {
  fontSize: 14,
  fontFamily: theme.fonts.medium,
  color: theme.colors.primary_100,
};

const Profile = () => {
  const { user, refetchUser } = useAuth();
  const rating = '0.0';

  const [section, setSection] = useState('profile');

  const renderBody = () => {
    if (section === 'profile') {
      return <BodyProfile user={user} />;
    }
    if (section === 'address') {
      return <BodyAddress user={user} />;
    }
    if (section === 'bank') {
      return <BodyBank user={user} />;
    }
    if (section === 'auth') {
      return <BodyAuth user={user} />;
    }
  };

  const handleCopyLink = async (code: string) => {
    try {
      await Clipboard.setStringAsync(code);
      handleSuccess('Código copiado');
    } catch (err) {
      handleError(err);
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        handleSuccess('Imagem atualizada');
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
        {/* <SettingsHeaderIcon width={width} style={{ marginTop: -50 }} /> */}

        <BackButton
          title="Perfil"
          color={theme.colors.neutro_00}
          style={{ position: 'absolute', zIndex: 2, top: 40, left: 16 }}
        />

        <Row
          style={{ position: 'absolute', bottom: -53, paddingHorizontal: 16 }}
        >
          <ProfileButton onPress={handlePickImage}>
            <AvatarImage
              uri={user?.passenger?.image?.url}
              size={116}
              style={{
                borderWidth: 2,
                borderColor: theme.colors.neutro_00,
              }}
            />

            <Pressable
              onPress={handlePickImage}
              style={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                backgroundColor: theme.colors.primary_100,
                borderRadius: 16,
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: theme.colors.neutro_00,
              }}
            >
              <Ionicons
                name="pencil"
                size={16}
                color={theme.colors.neutro_00}
              />
            </Pressable>
          </ProfileButton>
          <Column>
            <Row>
              <Text
                fontWeight={500}
                color={theme.colors.neutro_00}
                style={{ maxWidth: '70%' }}
              >
                {user?.passenger?.socialName || user?.passenger?.name}{' '}
                {`\u2022`}{' '}
              </Text>
              {/* <StarIcon /> */}
              <Text fontWeight={500} color={theme.colors.neutro_00}>
                {rating?.averageRating || 0}
              </Text>
            </Row>

            <Row>
              <Card
                direction="row"
                padding={10}
                borderRadius={8}
                style={{ width: undefined }}
              >
                <Text fontWeight={500} color={theme.colors.primary_100}>
                  ID {user?.passenger?.code}
                </Text>
              </Card>
              <Pressable
                onPress={() => handleCopyLink(user?.passenger?.code)}
                hitSlop={20}
              >
                {/* <ClipboardIcon width={26} height={26} /> */}
              </Pressable>
            </Row>
          </Column>
        </Row>
      </HeaderWrapper>

      <ContentWrapper>
        <SwitchProfile selected={section} setSelected={setSection} />

        {renderBody()}
      </ContentWrapper>

      <Text
        size={11}
        fontWeight={500}
        color={theme.colors.gray_9e}
        style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 30 }}
      >
        Versão {Constants.default.expoConfig?.version}
      </Text>
    </GlobalContainer>
  );
};

export default Profile;

type Props = {
  user: IUser;
};

const BodyProfile = ({ user }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetchUser } = useAuth();

  const { control, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.passenger?.name,
      social_name: user?.passenger?.socialName,
      cpf: user?.passenger?.cpf,
      rg: user?.passenger?.rg,
      email: user?.email,
      phone: user?.passenger?.phone,
    },
  });

  const onSubmit = async (form: ProfileForm) => {
    try {
      setIsLoading(true);
      await api.put(`updatePassenger`, {
        personalData: {
          name: form.name,
          socialName: form.social_name,
          phone: form.phone,
        },
      });

      refetchUser();
      setEditMode(false);
      handleSuccess('Perfil atualizado com sucesso');
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding={10}>
      <Input
        name="name"
        control={control}
        label="Nome completo"
        labelStyle={labelStyle}
        editable={editMode}
      />
      <Input
        name="social_name"
        control={control}
        label="Nome social (opcional)"
        placeholder="Digite seu nome social"
        autoCapitalize="words"
        labelStyle={labelStyle}
        editable={editMode}
      />
      <Input
        name="cpf"
        control={control}
        label="CPF"
        placeholder="Digite seu CPF"
        type="cpf"
        labelStyle={labelStyle}
        editable={false}
        iconRight="PadlockIcon"
        iconColor={theme.colors.primary_100}
      />
      <Input
        name="rg"
        control={control}
        label="RG"
        placeholder="Digite seu RG"
        labelStyle={labelStyle}
        editable={false}
        iconRight="PadlockIcon"
        iconColor={theme.colors.primary_100}
      />
      <Input
        name="email"
        control={control}
        label="E-mail"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        labelStyle={labelStyle}
        editable={false}
        iconRight="PadlockIcon"
        iconColor={theme.colors.primary_100}
      />

      <Input
        name="phone"
        control={control}
        label="Telefone"
        labelStyle={labelStyle}
        editable={editMode}
      />

      {editMode ? (
        <Row style={{ gap: 10 }}>
          <Button
            onPress={handleSubmit(onSubmit)}
            style={{ flex: 1, height: 37 }}
            fontSize={13}
            isLoading={isLoading}
          >
            Salvar
          </Button>
          <Button
            onPress={() => setEditMode(false)}
            style={{ flex: 1, height: 37 }}
            fontSize={13}
            backgroundColor={theme.colors.gray_9e}
          >
            Cancelar
          </Button>
        </Row>
      ) : (
        <Button
          onPress={() => setEditMode(true)}
          style={{ width: 160, height: 37 }}
          fontSize={13}
        >
          Editar
        </Button>
      )}
    </Card>
  );
};

const BodyAddress = ({ user }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetchUser } = useAuth();

  const { control, handleSubmit, clearErrors, setValue, watch, reset } =
    useForm<AddressForm>();

  const handleReset = () => {
    reset({
      zipCode: user?.passenger?.zipCode,
      state: user?.passenger?.state,
      district: user?.passenger?.neighborhood,
      street: user?.passenger?.address,
      number: user?.passenger?.number,
      complement: user?.passenger?.complement || undefined,
    });
  };

  useEffect(() => {
    handleReset();
  }, [user]);

  const zipCode = watch('zipCode');

  const handleZipBlurDevolution = async () => {
    if (zipCode && zipCode.length === 9) {
      try {
        const res = await getAdressByZipCode(zipCode);

        clearErrors('zipCode');

        setValue('street', res.logradouro?.toLocaleUpperCase(), {
          shouldValidate: true,
        });
        setValue('city', res.localidade?.toLocaleUpperCase(), {
          shouldValidate: true,
        });
        setValue('district', res.bairro?.toLocaleUpperCase(), {
          shouldValidate: true,
        });
        setValue('state', res.uf?.toLocaleUpperCase(), {
          shouldValidate: true,
        });
      } catch (error) {
        return null;
      }
    }
  };

  useEffect(() => {
    handleZipBlurDevolution();
  }, [zipCode]);

  const onSubmit = async (form: AddressForm) => {
    try {
      setIsLoading(true);
      await api.put(`updatePassenger`, {
        addressData: {
          zipCode: form.zipCode,
          state: form.state,
          neighborhood: form.district,
          address: form.street,
          number: form.number,
          complement: form.complement,
        },
      });

      refetchUser();
      setEditMode(false);
      handleSuccess('Endereço atualizado com sucesso');
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding={10}>
      <Input
        name="zipCode"
        control={control}
        label="CEP"
        placeholder="Digite seu CEP"
        type="zip-code"
        labelStyle={labelStyle}
        editable={editMode}
      />
      <Input
        name="street"
        control={control}
        label="Logradouro"
        placeholder="Digite seu logradouro"
        autoCapitalize="words"
        labelStyle={labelStyle}
        editable={editMode}
      />
      <Input
        name="number"
        control={control}
        label="Número"
        placeholder="Digite o número"
        type="only-numbers"
        labelStyle={labelStyle}
        editable={editMode}
      />
      <Input
        name="district"
        control={control}
        label="Bairro"
        placeholder="Digite seu bairro"
        autoCapitalize="words"
        labelStyle={labelStyle}
        editable={editMode}
      />
      <Input
        name="state"
        control={control}
        label="Estado"
        placeholder="Digite seu estado"
        autoCapitalize="words"
        labelStyle={labelStyle}
        editable={editMode}
      />
      <Input
        name="complement"
        control={control}
        label="Complemento (opcional)"
        placeholder="Digite o complemento"
        autoCapitalize="words"
        labelStyle={labelStyle}
        editable={editMode}
      />

      {editMode ? (
        <Row style={{ gap: 10 }}>
          <Button
            onPress={handleSubmit(onSubmit)}
            style={{ flex: 1, height: 37 }}
            fontSize={13}
            isLoading={isLoading}
          >
            Salvar
          </Button>
          <Button
            onPress={() => setEditMode(false)}
            style={{ flex: 1, height: 37 }}
            fontSize={13}
            backgroundColor={theme.colors.gray_9e}
          >
            Cancelar
          </Button>
        </Row>
      ) : (
        <Button
          onPress={() => setEditMode(true)}
          style={{ width: 160, height: 37 }}
          fontSize={13}
        >
          Editar
        </Button>
      )}
    </Card>
  );
};

const BodyBank = ({ user }: Props) => {
  const { refetchUser } = useAuth();
  const { setModal } = useModal();

  const [brandCard, setBrandCard] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm<BankAccountForm>({
    resolver: yupResolver(BankAccountSchema),
  });

  const handleDeleteCreditCard = async (cardId: number) => {
    try {
      await api.delete(`/deleteCard?cardId=${cardId}`);
      refetchUser();

      handleSuccess('Cartão deletado com sucesso');
    } catch (err) {
      handleError(err);
    }
  };

  const handleCreateCreditCard = async (resp: any) => {
    try {
      setModal({ name: 'addCreditCardSuccess' });
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (form: BankAccountForm) => {
    try {
      setIsLoading(true);

      setBrandCard(brand);
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
  };

  return user?.passenger?.cards && user?.passenger?.cards?.length > 0 ? (
    <ContentWrapper style={{ marginTop: 20, gap: 15 }}>
      {user?.passenger?.cards?.map(item => (
        <Card
          key={item?.id}
          direction="row"
          marginTop={0}
          marginBottom={0}
          padding={15}
          gap={20}
          style={{ alignItems: 'center' }}
          hasShadow={false}
          hasBorder
          onPress={() =>
            router.push({
              pathname: '/(main)/Settings/EditCreditCard',
              params: { id: item?.id },
            })
          }
        >
          {/* <FlagWrapper>{getCardFlagList(item?.brand)}</FlagWrapper> */}
          <Text fontWeight={600} style={{ flex: 1 }}>
            {item.name}
          </Text>
          <Text>**** {item?.lastDigits}</Text>

          <DeleteButton onPress={() => handleDeleteCreditCard(item.id)}>
            {/* <TrashRedIcon /> */}
          </DeleteButton>
        </Card>
      ))}
      <Button
        onPress={() => router.push('/(main)/Settings/AddCreditCard')}
        style={{ width: 160, height: 37 }}
        fontSize={13}
        iconLeft="PlusWhiteIcon"
      >
        Adicionar cartão
      </Button>
    </ContentWrapper>
  ) : (
    <Card padding={10}>
      <Input
        name="holder_name"
        control={control}
        label="Nome do titular"
        placeholder="Digite o nome do titular"
        autoCapitalize="words"
        labelStyle={labelStyle}
      />
      <Input
        name="card_number"
        control={control}
        label="Número do cartão"
        placeholder="0000 0000 0000 0000"
        type="credit-card"
        labelStyle={labelStyle}
      />
      <Input
        name="cvv"
        control={control}
        label="CVV"
        placeholder="0000"
        type="only-numbers"
        maxLength={4}
        labelStyle={labelStyle}
      />
      <Input
        name="validate"
        control={control}
        label="Data de validade"
        placeholder="mm/aa"
        type="datetime"
        options={{ format: 'MM/yy' }}
        labelStyle={labelStyle}
      />
      <Text>
        Inserir apenas os dois últimos dígitos do ano impresso no cartão
      </Text>
      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ width: 160, height: 37 }}
        fontSize={13}
        iconLeft="PlusWhiteIcon"
        isLoading={isLoading}
      >
        Adicionar cartão
      </Button>
    </Card>
  );
};

type FormAuth = {
  email: string;
  password: string;
};

const BodyAuth = ({ user }: Props) => {
  const { logout } = useAuth();
  const { setModal } = useModal();

  const { control } = useForm<FormAuth>({
    defaultValues: {
      email: user?.email,
      password: '********',
    },
  });

  const handleDeleteAccount = async () => {
    try {
      try {
        await api.get('/signout');
      } catch (err) {
        //
      }

      await api.delete('/deleteUser');
      router.push('/(auth)/Intro');
      setTimeout(
        () =>
          setModal({
            name: 'deleteAccountSuccess',
            onPress: () => logout(true),
            onPressBack: () => logout(true),
          }),
        200,
      );
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <Card padding={10}>
        <Input
          name="email"
          control={control}
          label="E-mail"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          labelStyle={labelStyle}
          editable={false}
        />
        <Button
          onPress={() => router.push('/(main)/Settings/ChangeEmail')}
          style={{ width: 160, height: 37 }}
          fontSize={13}
        >
          Alterar e-mail
        </Button>

        <Input
          name="password"
          control={control}
          label="Senha"
          placeholder="Digite sua senha..."
          labelStyle={labelStyle}
          editable={false}
        />
        <Button
          onPress={() => router.push('/(main)/Settings/ChangePassword')}
          style={{ width: 160, height: 37 }}
          fontSize={13}
        >
          Alterar senha
        </Button>
      </Card>
      <Button
        onPress={() =>
          setModal({
            name: 'deleteAccount',
            onPress: () => handleDeleteAccount(),
          })
        }
        fontSize={12}
        fontColor={theme.colors.primary_60}
        iconLeft="TrashIcon"
        style={{
          height: 37,
          justifyContent: 'flex-start',
          marginVertical: 10,
          paddingHorizontal: 20,
        }}
        backgroundColor={theme.colors.primary_20}
      >
        Excluir conta
      </Button>
    </>
  );
};
