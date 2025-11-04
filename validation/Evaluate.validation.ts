import * as Yup from 'yup';

export type EvaluateForm = Yup.InferType<typeof EvaluateSchema>;

export const EvaluateSchema = Yup.object({
  rating: Yup.number(),
  title: Yup.string(),
  comment: Yup.string(),
});
