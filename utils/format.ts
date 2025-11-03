import { addHours, isToday, isYesterday } from 'date-fns';

export const formatCurrency = (value?: number, isHidden?: boolean) => {
  if (isHidden) {
    return 'R$ ******';
  }
  if (!value) {
    return 'R$ 0,00';
  }
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const normalize = (value: string) => {
  return value.replace(/\D/g, '');
};

export const capitalize = (text?: string): string => {
  if (!text) {
    return '';
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatDateNominal = (date: string) => {
  if (!date) {
    return '';
  }

  const dateISO = new Date(`${date}`);

  if (isToday(addHours(dateISO, 3))) {
    return 'Hoje';
  }
  if (isYesterday(addHours(dateISO, 3))) {
    return 'Ontem';
  }
  return date?.split('-')?.reverse()?.join('/');
};

export const phoneFormat = (phone: string) => {
  phone = phone.replace(/\D/g, '');
  const match = phone.match(/^(\d{1,2})(\d{0,5})(\d{0,4})$/);
  if (match) {
    phone = `(${match[1]}${match[2] ? ') ' : ''}${match[2]}${
      match[3] ? '-' : ''
    }${match[3]}`;
    return phone;
  }
  return phone;
};

export const cpfFormat = (cpf?: string) => {
  if (!cpf) {
    return '';
  }
  cpf = cpf?.replace(/\D/g, '');
  const match = cpf.match(/^(\d{1,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
  if (match) {
    cpf = `${match[1]}${match[2] ? '.' : ''}${match[2]}${match[3] ? '.' : ''}${
      match[3]
    }${match[4] ? '-' : ''}${match[4]}`;
    return cpf;
  }
  return cpf;
};

export const formatInputPixKey = (text: string) => {
  const textNormalized = normalize(text);
  if (/^\d{11}$/.test(textNormalized)) {
    if (textNormalized.startsWith('119')) {
      return phoneFormat(textNormalized);
    }
    return cpfFormat(textNormalized);
  }
  return text;
};
