import * as Yup from 'yup';

export type CreditCardForm = Yup.InferType<typeof CreditCardSchema>;

export const CreditCardSchema = Yup.object({
  card_name: Yup.string(),
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
