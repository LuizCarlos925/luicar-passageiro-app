import * as Yup from 'yup';

export type ReportForm = Yup.InferType<typeof ReportSchema>;

export const ReportSchema = Yup.object({
  report: Yup.string().required('Relate o ocorrido para enviar a denúncia.'),
});
