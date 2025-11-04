import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Constants from 'expo-constants';

import * as Icon from '@/assets/icons';

import Text from '@/components/Text/Text';
import { Card } from '@/components/Card/Card';
import { Divider } from '@/components/Divider/Divider';
import { IconComponent } from '@/components/Icon/Icon';
import BackButton from '@/components/BackButton/BackButton';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';
import { GlobalContainer } from '@/components/Container/Container';

import { width } from '@/global/constants';
import { theme } from '@/global/theme';

import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';
import { SETTINGS_MENUS } from '@/assets/json/settingsMenu';

import { OptionButton, ProfileName, ProfileRow, VersionText } from './styles';

const Settings = () => {
  const { user, logout } = useAuth();
  const { setModal } = useModal();

  return (
    <GlobalContainer
      alignItems="flex-start"
      paddingHorizontal={16}
      showTabBar
      withoutPaddingTop
      statusBarTextColor="light"
    >
      {/* <Icon.SettingsHeaderIcon
        width={width}
        style={{ position: 'absolute', top: 0, zIndex: -1 }}
      /> */}

      <BackButton
        color={theme.colors.neutro_00}
        style={{ zIndex: 2, marginTop: 40 }}
      />

      <Card marginTop={90} padding={20}>
        <AvatarImage
          uri={user?.passenger?.image?.url}
          size={116}
          style={{
            position: 'absolute',
            top: -58,
            alignSelf: 'center',
            borderWidth: 2,
            borderColor: theme.colors.neutro_00,
          }}
        />

        <ProfileRow>
          <ProfileName>
            {user?.passenger?.socialName || user?.passenger?.name} {`\u2022`}{' '}
          </ProfileName>
          <AntDesign name="star" size={12} color="#F1DE3B" />
          <ProfileName style={{ fontSize: 12, lineHeight: 15 }}> 0</ProfileName>
        </ProfileRow>
        <VersionText>
          Versão {Constants.default.expoConfig?.version}
        </VersionText>

        <Divider style={{ marginTop: 15 }} />

        {SETTINGS_MENUS.map(item => (
          <OptionButton key={item.id} onPress={() => router.push(item.path)}>
            <IconComponent
              name={item?.icon}
              size={20}
              color={theme.colors.primary_100}
            />
            <Text
              fontWeight={600}
              color={theme.colors.primary_100}
              style={{ flex: 1 }}
            >
              {item.title}
            </Text>

            <Icon.ChevronLeftIcon
              height={16}
              color={theme.colors.gray_90}
              style={{ transform: [{ rotateZ: '180deg' }] }}
            />
          </OptionButton>
        ))}
      </Card>

      <OptionButton
        onPress={() => setModal({ name: 'logout', onPress: () => logout() })}
        style={{ paddingLeft: 16 }}
      >
        <Icon.LogoutIcon />
        <Text size={16} fontWeight={500} color={theme.colors.red_d1}>
          Sair
        </Text>
      </OptionButton>
    </GlobalContainer>
  );
};

export default Settings;
