import axios from 'axios';

export const getAll = () => {

};

export const getMostRecent = () => {

};

export const updateCutoffTxn = (id, type, next, isCutoff) => {
  axios({
    method: 'patch',
    url: `/${type}-transaction/${id}`,
    data: { isCutoff, },
  })
    .then(({ data }) => {
      next(null, data);
    })
    .catch((err) => {
      next(err);
    });
};
