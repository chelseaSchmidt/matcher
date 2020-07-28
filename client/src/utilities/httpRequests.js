import axios from 'axios';

export const getAll = () => {

};

export const getMostRecent = () => {

};

export const updateTransaction = (id, type, next, isCutoff=false, group=null, incorrect=false, missing=false) => {
  axios({
    method: 'patch',
    url: `/${type}-transaction/${id}`,
    data: {
      isCutoff,
      group,
      incorrect,
      missing,
    },
  })
    .then(() => {
      next(null);
    })
    .catch((err) => {
      next(err);
    });
};
