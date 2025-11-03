/* eslint-disable react/style-prop-object */
import React from 'react';
import { LogBox } from 'react-native';
import Toast, { ErrorToast, SuccessToast } from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from 'expo-font';

import {
  NataSansBold,
  NataSansLight,
  NataSansMedium,
  NataSansRegular,
  NataSansSemiBold,
} from '@/assets/fonts';

import { theme } from '@/global/theme';

import useUpdate from '@/hooks/useUpdate';
import AuthProvider from '@/hooks/useAuth';
import ModalProvider from '@/hooks/useModal';

import { handleError } from '@/utils/handleError';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

const toastConfig = {
  error: (props: any) => <ErrorToast {...props} text1NumberOfLines={3} />,
  success: (props: any) => <SuccessToast {...props} text1NumberOfLines={3} />,
};

setDefaultOptions({ locale: ptBR });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 20000,
      onError: handleError,
      retry: false,
      initialDataUpdatedAt: 0,
    },
  },
});

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

SplashScreen.preventAutoHideAsync();

const App = () => {
  useUpdate();

  useFonts({
    NataSansLight,
    NataSansRegular,
    NataSansMedium,
    NataSansSemiBold,
    NataSansBold,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <KeyboardProvider>
            <ModalProvider>
              <AuthProvider>
                <BottomSheetModalProvider>
                  <SafeAreaProvider>
                    <StatusBar style="auto" />
                    <Slot />
                    <Toast config={toastConfig} />
                  </SafeAreaProvider>
                </BottomSheetModalProvider>
              </AuthProvider>
            </ModalProvider>
          </KeyboardProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
