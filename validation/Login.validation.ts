import * as Yup from 'yup';
import { normalize } from '@/utils/format';
import { validateCPF } from './yup';

export type LoginForm = Yup.InferType<typeof LoginSchema>;

export const LoginSchema = Yup.object({
  identifier: Yup.string()
    .email('E-mail inválido')
    .required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
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
  name: Yup.string()
    .required('Nome obrigatório')
    .matches(
      /^[a-záàâãéèêíïóôõöúçñ\s]+$/i,
      'Nome deve conter apenas letras e espaços',
    ),
  social_name: Yup.string().matches(
    /^[a-záàâãéèêíïóôõöúçñ\s]*$/i,
    'Nome social deve conter apenas letras e espaços',
  ),
  cpf: Yup.string()
    .required('CPF obrigatório')
    .min(14, 'CPF deve conter 11')
    .test('test-invalid-cpf', 'Insira um CPF válido', document =>
      document ? validateCPF(normalize(document)) : false,
    ),
  phone: Yup.string()
    .required('Telefone obrigatório')
    .min(14, 'Telefone inválido')
    .max(15, 'Telefone inválido'),
  zipCode: Yup.string().required('CEP obrigatório').min(9, 'CEP inválido'),
  street: Yup.string().required('Logradouro obrigatório'),
  number: Yup.string().required('Número obrigatório'),
  city: Yup.string().required('Cidade obrigatória'),
  district: Yup.string().required('Bairro obrigatório'),
  state: Yup.string()
    .required('UF obrigatório')
    .min(2, 'UF inválido')
    .max(2, 'UF inválido'),
  complement: Yup.string(),
});

export type SignUpAccessForm = Yup.InferType<typeof SignUpAccessSchema>;

export const SignUpAccessSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
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
  passwordConfirm: Yup.string()
    .required('Confirmação de senha obrigatória')
    .oneOf([Yup.ref('password')], 'Senha não coincide com a anterior'),
});
