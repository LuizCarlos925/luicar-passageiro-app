import React from 'react';
import { router } from 'expo-router';
import * as Constants from 'expo-constants';

import * as Icon from '@/assets/icons';

import Text from '@/components/Text/Text';
import { Divider } from '@/components/Divider/Divider';
import { IconComponent } from '@/components/Icon/Icon';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';
import { GlobalContainer } from '@/components/Container/Container';

import { colors, theme } from '@/global/theme';

import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';
import { SETTINGS_MENUS } from '@/assets/json/settingsMenu';

import { Pressable, StyleSheet, View } from 'react-native';
import { shadow } from '@/global/shadow';
import { width } from '@/global/constants';

const Settings = () => {
  const { logout } = useAuth();
  const { setModal } = useModal();

  return (
    <GlobalContainer paddingHorizontal={20} showTabBar withoutPaddingTop>
      <Icon.SettingsHeaderIcon
        width={width}
        style={{ position: 'absolute', top: -12, zIndex: -1 }}
      />

      <View style={styles.card}>
        <AvatarImage
          uri="https://randomuser.me/api/portraits/men/75.jpg"
          size={116}
          style={{
            marginTop: -78,
            alignSelf: 'center',
            borderWidth: 2,
            borderColor: theme.colors.neutro_00,
          }}
        />

        <View style={styles.rowProfile}>
          <Text size={16} fontWeight={600} color={colors.secondary_100}>
            Gabriel souza Lima {`\u2022`}
          </Text>

          <IconComponent name="StarIcon" size={16} />
          <Text size={16} fontWeight={600} color={colors.secondary_100}>
            0
          </Text>
        </View>

        <Text color={colors.secondary_60} style={styles.text}>
          Versão {Constants.default.expoConfig?.version}
        </Text>

        <Divider style={{ marginTop: 15 }} />

        {SETTINGS_MENUS.map(item => (
          <Pressable
            key={item.id}
            onPress={() => router.push(item.path)}
            style={styles.optionBtn}
          >
            <IconComponent
              name={item?.icon}
              size={20}
              color={theme.colors.secondary_100}
            />
            <Text
              fontWeight={600}
              color={theme.colors.secondary_100}
              style={{ flex: 1 }}
            >
              {item.title}
            </Text>

            <IconComponent
              name="ChevronIcon"
              size={16}
              color={colors.secondary_100}
            />
          </Pressable>
        ))}

        <Divider />

        <Pressable
          onPress={() => setModal({ name: 'logout', onPress: () => logout() })}
          style={styles.optionBtn}
        >
          <IconComponent name="LogoutIcon" />
          <Text
            fontWeight={500}
            color={colors.secondary_60}
            style={{ flex: 1 }}
          >
            Sair
          </Text>

          <IconComponent
            name="ChevronIcon"
            size={16}
            color={colors.secondary_100}
          />
        </Pressable>

        <Pressable
          onPress={() => setModal({ name: 'logout', onPress: () => logout() })}
          style={styles.optionBtn}
        >
          <IconComponent name="TrashIcon" />
          <Text fontWeight={500} color={colors.error_60} style={{ flex: 1 }}>
            Excluir conta
          </Text>
          <IconComponent
            name="ChevronIcon"
            size={16}
            color={colors.secondary_100}
          />
        </Pressable>
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginTop: 120,
    padding: 20,
    gap: 8,
    borderRadius: 12,
    backgroundColor: colors.neutro_00,
    ...shadow.default,
  },
  rowProfile: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  text: {
    textAlign: 'center',
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
});

export default Settings;
