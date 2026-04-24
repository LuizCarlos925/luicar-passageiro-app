import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import * as Constants from 'expo-constants';
import { updateId } from 'expo-updates';

import * as Icon from '@/assets/icons';
import { SETTINGS_MENUS } from '@/assets/json/settingsMenu';

import Text from '@/components/Text/Text';
import { ModalSupport } from '@/components/screen';
import { Divider } from '@/components/Divider/Divider';
import { IconComponent } from '@/components/Icon/Icon';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';
import { GlobalContainer } from '@/components/Container/Container';

import { shadow } from '@/global/shadow';
import { width } from '@/global/constants';
import { colors, theme } from '@/global/theme';

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

import { useRating } from '@/services/Settings/rating.service';

const Settings = () => {
  const { user, logout } = useAuth();
  const { setModal } = useModal();

  const [isVisible, setIsVisible] = useState(false);

  const { data: rating } = useRating(user?.passenger?.id, 'passenger');

  return (
    <GlobalContainer paddingHorizontal={20} showTabBar withoutPaddingTop>
      <Icon.SettingsHeaderIcon
        width={width}
        style={{ position: 'absolute', top: -12, zIndex: -1 }}
        preserveAspectRatio="xMidYMid slice"
      />

      <View style={styles.card}>
        <AvatarImage
          uri={user?.passenger?.image?.url || ''}
          size={116}
          style={{
            marginTop: -78,
            alignSelf: 'center',
            borderWidth: 2,
            borderColor: theme.colors.neutro_00,
          }}
        />

        <View style={styles.rowProfile}>
          <Text
            size={16}
            fontWeight={600}
            color={colors.secondary_100}
            style={{ flexShrink: 1 }}
          >
            {user?.passenger?.socialName || user?.passenger?.name}
          </Text>

          <Text>{`\u2022`}</Text>

          <IconComponent name="StarIcon" size={16} color={colors.primary_100} />
          <Text size={16} fontWeight={600} color={colors.secondary_100}>
            {rating?.averageRating || 0}
          </Text>
        </View>

        <Text color={colors.secondary_60} style={styles.text}>
          Versão {Constants.default.expoConfig?.version} - {updateId?.slice(-4)}
        </Text>

        <Divider style={{ marginTop: 15 }} />

        {SETTINGS_MENUS.map(item => (
          <Pressable
            key={item.id}
            onPress={() => {
              if (item.title === 'Suporte') {
                setIsVisible(true);
                return;
              }
              router.push(item.path);
            }}
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
          onPress={() => setModal({ name: 'logout', onPress: logout })}
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
          onPress={() => router.push('/(main)/Settings/DeleteAccount')}
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

      <ModalSupport
        isVisible={isVisible}
        onBackPress={() => setIsVisible(false)}
      />
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
