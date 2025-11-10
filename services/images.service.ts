import { api } from '@/services/api';

type Body = {
  ref: string;
  refId: string;
  field: string;
  uri: string;
};

export const uploadImage = async ({
  ref,
  refId,
  field = 'image',
  uri,
}: Body) => {
  const formData = new FormData();

  const file = {
    uri,
    name: uri.split('/').pop() || 'photo.jpg',
    type: 'image/jpg',
  } as any;

  formData.append('ref', ref);
  formData.append('refId', refId);
  formData.append('field', field);
  formData.append('files', file);

  await api.post('/upload', formData);
};

export const deleteImage = async (imageId: number) => {
  await api.delete(`/upload/files/${imageId}`);
};
