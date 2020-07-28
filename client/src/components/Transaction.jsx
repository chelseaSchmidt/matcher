import React from 'react';
import {object, bool, func } from 'prop-types';
import { updateTransaction } from '../utilities/httpRequests';

const Transaction = ({ txn, isBank, renderRecon }) => {
  let button3 = 'Incorrect';
  let type = 'book';
  if (isBank) {
    button3 = 'Missing';
    type = 'bank';
  }
  console.log(txn);

  return (
    <div>
      <span>{`${txn.date} | ${txn.description} | ${txn.amount}`}</span>
      <button type="button" onClick={() => updateTransaction(txn._id, type, renderRecon, true)}>Cutoff</button>
      <button type="button">Define Group</button>
      <button type="button">{button3}</button>
    </div>
  );
};

export default Transaction;

Transaction.propTypes = {
  txn: object.isRequired,
  isBank: bool.isRequired,
  renderRecon: func.isRequired,
};