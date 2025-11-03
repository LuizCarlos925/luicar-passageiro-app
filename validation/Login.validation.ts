import * as Yup from 'yup';
import { normalize } from '@/utils/format';
import { validateCPF } from './yup';

export type LoginForm = Yup.InferType<typeof LoginSchema>;

export const LoginSchema = Yup.object({
  identifier: Yup.string()
    .email('E-mail inválido')
    .required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatório'),
  rememberMe: Yup.boolean(),
});

export type ForgotPasswordForm = Yup.InferType<typeof ForgotPasswordSchema>;

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email('E-mail Inválido').required('E-mail obrigatório'),
});

export type RecoverPasswordForm = Yup.InferType<typeof RecoverPasswordSchema>;

export const RecoverPasswordSchema = Yup.object({
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
    .matches(/^(?=.*[0-9])/, 'Senha fraca. Insira pelo menos 1 (um) número')
    .matches(
      /^(?=.*[\W])/,
      'Senha fraca. Insira pelo menos 1 (um) caractere especial',
    ),
  confirmPassword: Yup.string()
    .required('Confirmação de senha obrigatória')
    .oneOf([Yup.ref('password')], 'Senha não coincide com a anterior'),
});

export type SignUpProfileForm = Yup.InferType<typeof SignUpProfileSchema>;

export const SignUpProfileSchema = Yup.object({
  avatar: Yup.string().required('Foto obrigatória'),
  name: Yup.string().required('Nome obrigatório'),
  social_name: Yup.string(),
  cpf: Yup.string()
    .required('CPF obrigatório')
    .min(14, 'CPF deve conter 11')
    .test('test-invalid-cpf', 'Insira um CPF válido', document =>
      document ? validateCPF(normalize(document)) : false,
    ),
  rg: Yup.string(),
  // .required('RG obrigatório'),
  email: Yup.string().email('E-mail Inválido').required('E-mail obrigatório'),
  phone: Yup.object({
    phoneNumber: Yup.string().required('Número de telefone obrigatório'),
    ddi: Yup.string(),
    country: Yup.string(),
    image: Yup.string(),
  }).required('Telefone obrigatório'),
});

export type SignUpAddressForm = Yup.InferType<typeof SignUpAddressSchema>;

export const SignUpAddressSchema = Yup.object({
  zipCode: Yup.string().required('CEP obrigatório').min(9, 'CEP inválido'),
  street: Yup.string().required('Logradouro obrigatório'),
  number: Yup.string().required('Número obrigatório'),
  city: Yup.string(),
  district: Yup.string().required('Bairro obrigatório'),
  state: Yup.string().required('Estado obrigatório'),
  complement: Yup.string(),
});

export type SignUpBankAccountForm = Yup.InferType<
  typeof SignUpBankAccountSchema
>;

export const SignUpBankAccountSchema = Yup.object({
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
  brand: Yup.string(),
});

export type SignUpPasswordForm = Yup.InferType<typeof SignUpPasswordSchema>;

export const SignUpPasswordSchema = Yup.object({
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
    .matches(/^(?=.*[0-9])/, 'Senha fraca. Insira pelo menos 1 (um) número')
    .matches(
      /^(?=.*[\W])/,
      'Senha fraca. Insira pelo menos 1 (um) caractere especial',
    ),
  passwordConfirm: Yup.string()
    .required('Confirmação de senha obrigatória')
    .oneOf([Yup.ref('password')], 'Senha não coincide com a anterior'),
  acceptTerms: Yup.boolean().required(),
});
