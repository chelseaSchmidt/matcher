import axios from 'axios';

export const createReconFromSourceFiles = (bankFile, bookFile, endBank, endBook, bankName) => {
  const formData = new FormData();
  formData.append('sourceFiles', bankFile);
  formData.append('sourceFiles', bookFile);
  formData.append('endBank', endBank);
  formData.append('endBook', endBook);
  formData.append('bankName', bankName);

  return axios({
    method: 'post',
    url: '/files',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateIncorrect = (id, type, next, isIncorrect) => {
  axios({
    method: 'patch',
    url: `/incorrect-transaction/${id}`,
    data: { isIncorrect, type },
  })
    .then(({ data }) => {
      next(null, data);
    })
    .catch((err) => {
      next(err);
    });
};

export const updateCutoff = (id, type, next, isCutoff) => {
  axios({
    method: 'patch',
    url: `/cutoff-transaction/${id}`,
    data: { isCutoff, type },
  })
    .then(({ data }) => {
      next(null, data);
    })
    .catch((err) => {
      next(err);
    });
};
