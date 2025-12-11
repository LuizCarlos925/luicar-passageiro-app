import * as Yup from 'yup';

export type DeleteAccountForm = Yup.InferType<typeof DeleteAccountSchema>;

export const DeleteAccountSchema = Yup.object({
  password: Yup.string().required('Senha é obrigatória'),
});
