import axios from 'axios';

export const getAll = () => {

};

export const getMostRecent = () => {

};

export const updateCutoffTxn = (id, type, next, isCutoff) => {
  axios({
    method: 'patch',
    url: `/transaction/${id}`,
    data: { isCutoff, type },
  })
    .then(({ data }) => {
      next(null, data);
    })
    .catch((err) => {
      next(err);
    });
};
