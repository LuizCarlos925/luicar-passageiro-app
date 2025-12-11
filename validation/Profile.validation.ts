import * as Yup from 'yup';
import { normalize } from '@/utils/format';
import { validateCPF } from './yup';

export type ProfileForm = Yup.InferType<typeof ProfileSchema>;

export const ProfileSchema = Yup.object({
  avatar: Yup.string().required('Foto obrigatória'),
  name: Yup.string().required('Nome obrigatório'),
  social_name: Yup.string(),
  cpf: Yup.string()
    .required('CPF obrigatório')
    .min(14, 'CPF deve conter 11')
    .test('test-invalid-cpf', 'Insira um CPF válido', document =>
      document ? validateCPF(normalize(document)) : false,
    ),
  rg: Yup.string().required('RG obrigatório'),
  email: Yup.string().email('E-mail Inválido').required('E-mail obrigatório'),
  phone: Yup.string().required('Telefone obrigatório'),
});

export type AddressForm = Yup.InferType<typeof AddressSchema>;

export const AddressSchema = Yup.object({
  zipCode: Yup.string().required('CEP obrigatório'),
  street: Yup.string().required('Logradouro obrigatório'),
  number: Yup.string().required('Número obrigatório'),
  city: Yup.string(),
  district: Yup.string().required('Bairro obrigatório'),
  state: Yup.string().required('Estado obrigatório'),
  complement: Yup.string(),
});

export type BankAccountForm = Yup.InferType<typeof BankAccountSchema>;

export const BankAccountSchema = Yup.object({
  holder_name: Yup.string().required('Nome do titular obrigatório'),
  card_number: Yup.string().required('Número do cartão obrigatório'),
  cvv: Yup.string().required('CVV obrigatório'),
  validate: Yup.string()
    .required('Validade obrigatório')
    .test('is-valid-date', 'Validade inválida', value => {
      if (!value) {
        return false;
      }
      const [month, year] = value.split('/').map(Number);
      if (month < 1 || month > 12) {
        return false;
      }
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      const fullYear = year < 100 ? year + 2000 : year;
      if (fullYear < currentYear) {
        return false;
      }
      if (fullYear === currentYear && month < currentMonth) {
        return false;
      }

      return true;
    }),
});

export type PasswordForm = Yup.InferType<typeof PasswordSchema>;

export const PasswordSchema = Yup.object({
  oldPassword: Yup.string().required('Senha atual obrigatório'),
  password: Yup.string()
    .required('Senha obrigatória')
    .min(8, 'A senha deve conter, no mínimo, 8 caracteres')
    .matches(
      /^(?=.*[A-Z])/,
      'Senha fraca. Insira pelo menos 1 (uma) letra maiúscula',
    )
    .matches(
      /^(?=.*[a-z])/,
      'Senha fraca. Insira pelo menos 1 (uma) letra minúscula',
    )
    .matches(
      /^(?=.*[\W])/,
      'Senha fraca. Insira pelo menos 1 (um) caractere especial',
    ),
  passwordConfirm: Yup.string().required('Confirmação de senha obrigatória'),
});

export type ProfileEmailForm = Yup.InferType<typeof ProfileEmailSchema>;

export const ProfileEmailSchema = Yup.object({
  reason: Yup.string().required('Motivo obrigatório'),
  email: Yup.string()
    .email('E-mail Inválido')
    .required('Novo e-mail obrigatório'),
  name: Yup.string().required('Nome obrigatório'),
  socialName: Yup.string(),
  cpf: Yup.string()
    .required('CPF obrigatório')
    .min(14, 'CPF deve conter 11')
    .test('test-invalid-cpf', 'Insira um CPF válido', document =>
      document ? validateCPF(normalize(document)) : false,
    ),
  currentEmail: Yup.string()
    .email('E-mail Inválido')
    .required('E-mail atual obrigatório'),
  phone: Yup.string().required('Telefone obrigatório'),
});
