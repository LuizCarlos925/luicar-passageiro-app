import * as Yup from 'yup';

export type RideForm = Yup.InferType<typeof RideSchema>;

export const RideSchema = Yup.object({
  origin: Yup.string().required('Origem é obrigatória'),
  destination: Yup.string().required('Destino é obrigatório'),
  vehicleId: Yup.string().required('Categoria é obrigatória'),
});
