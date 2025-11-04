import { IconT } from '@/components/Icon/Icon';
import { Href } from 'expo-router';

type ISettingsMenus = {
  id: number;
  title: string;
  icon: IconT;
  iconColor?: string;
  path: Href;
};

export const SETTINGS_MENUS: ISettingsMenus[] = [
  {
    id: 1,
    title: 'Meu perfil',
    icon: 'PersonIcon',
    path: '/(main)/Settings/Profile',
  },
  {
    id: 2,
    title: 'Meus cartões',
    icon: 'CreditCardIcon',
    path: '/(main)/Settings/CreditCards',
  },
  {
    id: 3,
    title: 'Alterar senha',
    icon: 'ChangePasswordIcon',
    path: '/(main)/Settings/ChangePassword',
  },
  {
    id: 4,
    title: 'FAQ',
    icon: 'FaqIcon',
    path: '/(main)/Settings/Faq',
  },
  {
    id: 5,
    title: 'Suporte',
    icon: 'SupportIcon',
    path: '/(main)/Settings/Support',
  },
  {
    id: 6,
    title: 'Termos de Uso',
    icon: 'TermsIcon',
    path: '/(main)/Settings/Terms',
  },
];
