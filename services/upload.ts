import { api } from './api';

interface IUploadPhoto {
  ref: `api::${string}`;
  refId: string;
  field: string;
  files: string[];
}

export const uploadPhoto = async (data: IUploadPhoto) => {
  if (!data.files.length) {
    return;
  }

  const formData = new FormData();

  formData.append('ref', data.ref);
  formData.append('refId', data.refId);
  formData.append('field', data.field);

  data.files.forEach(file => {
    formData.append('files', {
      uri: file,
      name: file.split('/').pop(),
      type: 'image/jpeg',
    } as any);
  });

  return api.post('upload', formData);
};
