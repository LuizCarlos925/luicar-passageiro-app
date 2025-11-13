import { IconT } from '@/components/Icon/Icon';

type CancelReason = {
  id: string;
  reason: string;
  icon: IconT;
};

export const CANCEL_REASONS: CancelReason[] = [
  {
    id: 'Motorista demorou muito para chegar',
    reason: 'Motorista demorou muito para chegar',
    icon: 'ReasonWatch',
  },
  {
    id: 'Viagem solicitada por engano',
    reason: 'Viagem solicitada por engano',
    icon: 'ReasonClose',
  },
  {
    id: 'Local de embarque errado',
    reason: 'Local de embarque errado',
    icon: 'ReasonSend',
  },
  {
    id: 'Não apareceu no local de embarque',
    reason: 'Não apareceu no local de embarque',
    icon: 'ReasonPin',
  },
  {
    id: 'Problema técnico com app ou conexão',
    reason: 'Problema técnico com app ou conexão',
    icon: 'ReasonSignal',
  },
  {
    id: 'Mudança de planos',
    reason: 'Mudança de planos',
    icon: 'ReasonBack',
  },
  {
    id: 'Outros',
    reason: 'Outros',
    icon: 'ReasonEllipsis',
  },
];
