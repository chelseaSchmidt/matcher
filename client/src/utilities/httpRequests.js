import axios from 'axios';

export const getAll = () => {

};

export const getMostRecent = () => {

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
