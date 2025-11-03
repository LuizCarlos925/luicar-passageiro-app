import React, { JSX, PropsWithChildren, useEffect } from 'react';
import { Keyboard, Platform, ViewStyle } from 'react-native';
import { useSegments } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Header, IHeaderProps } from '@/components/Header/Header';

import { StatusBar } from 'expo-status-bar';
import { RefreshControl } from 'react-native-gesture-handler';
import { theme } from '@/global/theme';
import { ContainerWrapper } from './styles';

interface Props {
  alignItems?: 'center' | 'flex-start';
  paddingHorizontal?: number;
  paddingBottom?: number;
  gap?: number;
  header?: IHeaderProps;
  component?: JSX.Element;
  containerStyle?: ViewStyle;
  contentWrapperStyle?: ViewStyle;
  scrollContainerStyle?: ViewStyle;
  withoutPaddingTop?: boolean;
  scrollable?: boolean;
  showTabBar?: boolean;
  statusBarTextColor?: 'light' | 'dark';
  hasInput?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export const GlobalContainer = ({
  children,
  alignItems = 'center',
  paddingHorizontal = 0,
  paddingBottom = 0,
  gap = 0,
  header,
  component,
  containerStyle,
  contentWrapperStyle,
  scrollContainerStyle,
  withoutPaddingTop,
  scrollable = true,
  showTabBar,
  statusBarTextColor = 'dark',
  hasInput,
  isRefreshing,
  onRefresh,
}: PropsWithChildren<Props>) => {
  const { bottom, top } = useSafeAreaInsets();
  const currentScreen = useSegments()?.[1];

  const [isOpenKeyboard, setIsOpenKeyboard] = React.useState(false);

  useEffect(() => {
    if (hasInput) {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => setIsOpenKeyboard(true),
      );

      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => setIsOpenKeyboard(false),
      );
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, [hasInput]);

  const handleContainer = () => {
    if (scrollable) {
      return (
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            {
              flexGrow: 1,
              paddingHorizontal,
              alignItems,
              paddingBottom: showTabBar ? 20 : 0,
              gap,
            },
            scrollContainerStyle,
          ]}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={isRefreshing || false}
                onRefresh={onRefresh}
                colors={[theme.colors.primary_60, theme.colors.secondary_60]}
              />
            ) : undefined
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {children}
        </KeyboardAwareScrollView>
      );
    }

    return (
      <ContainerWrapper
        style={[
          {
            alignItems,
            paddingHorizontal,
            paddingBottom: showTabBar ? 20 : 0,
            gap,
          },
          contentWrapperStyle,
        ]}
      >
        {children}
      </ContainerWrapper>
    );
  };

  return (
    <ContainerWrapper
      style={[
        {
          paddingTop: header || withoutPaddingTop ? 0 : top,
          paddingBottom: bottom + paddingBottom,
        },
        containerStyle,
      ]}
    >
      {Platform.OS === 'android' && <StatusBar style={statusBarTextColor} />}
      {header && <Header {...header} />}
      {handleContainer()}
      {component && component}
      {/* {showTabBar && (
        <TabBar
          currentScreen={currentScreen as ITab}
          showTabBar={!isOpenKeyboard && showTabBar}
        />
      )} */}
    </ContainerWrapper>
  );
};
