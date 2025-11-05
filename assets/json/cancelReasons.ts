import { IconT } from '@/components/Icon/Icon';

type CancelReason = {
  id: string;
  reason: string;
  icon: IconT;
};

export const CANCEL_REASONS: CancelReason[] = [
  {
    id: '1',
    reason: 'Motorista demorou muito para chegar',
    icon: 'ReasonWatch',
  },
  {
    id: '2',
    reason: 'Viagem solicitada por engano',
    icon: 'ReasonClose',
  },
  {
    id: '3',
    reason: 'Local de embarque errado',
    icon: 'ReasonSend',
  },
  {
    id: '4',
    reason: 'Não apareceu no local de embarque',
    icon: 'ReasonPin',
  },
  {
    id: '5',
    reason: 'Problema técnico com app ou conexão',
    icon: 'ReasonSignal',
  },
  {
    id: '6',
    reason: 'Mudança de planos',
    icon: 'ReasonBack',
  },
  {
    id: '7',
    reason: 'Outros',
    icon: 'ReasonEllipsis',
  },
];
