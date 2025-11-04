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
    title: 'Perfil',
    icon: 'ProfileIcon',
    path: '/(main)/Settings/Profile',
  },
  {
    id: 2,
    title: 'Advertências',
    icon: 'WarningIcon',
    path: '/(main)/Settings/Warnings',
  },
  {
    id: 3,
    title: 'Termos de Uso',
    icon: 'TermsIcon',
    path: '/(main)/Settings/Terms',
  },
  {
    id: 4,
    title: 'Denunciar',
    icon: 'ReportIcon',
    path: '/(main)/Settings/Reports',
  },
  {
    id: 5,
    title: 'FAQ',
    icon: 'FAQIcon',
    path: '/(main)/Settings/Faq',
  },
  {
    id: 6,
    title: 'Notificações',
    icon: 'NotificationIcon',
    path: '/(main)/Settings/Notifications',
  },
];
