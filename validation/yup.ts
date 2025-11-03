/* eslint-disable no-restricted-imports */
/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    max: 'Máximo de ${max} caracteres',
    min: 'Mínimo de ${min} caracteres',
  },
  number: {
    integer: 'Deve ser um número válido',
  },
  date: {
    typeError: 'Deve ser uma data válida',
  },
  array: {
    min: 'Selecione pelo menos uma opção do questionário',
  },
});

export default yup;

export const validateCPF = (cpf: any) => {
  // Remove non-numeric characters from the CPF
  cpf = String(cpf).replace(/\D/g, '');

  // Check if the CPF has 11 digits
  if (cpf.length !== 11) {
    return false;
  }

  // Check for known invalid CPFs
  const invalidCPFs = Array(10)
    .fill(0)
    .map((_, i) => `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`);
  if (invalidCPFs.includes(cpf)) {
    return false;
  }

  // Validate using the CPF algorithm
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1), 10) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.charAt(9), 10)) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1), 10) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.charAt(10), 10)) {
    return false;
  }

  return true;
};
