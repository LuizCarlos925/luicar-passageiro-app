import 'styled-components';
import { theme } from '@/global/theme';

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}

declare module 'styled-components/native' {
  import { ReactNativeStyledInterface } from 'styled-components/native';

  type ThemeType = typeof theme;
  export interface ReactNativeStyledInterface {
    /**
     * @deprecated Use expo-image instead
     */
    Image: any;
  }
}
