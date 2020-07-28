import React from 'react';
import {object, bool, func } from 'prop-types';
import { updateCutoff, updateIncorrect } from '../utilities/httpRequests';

const Transaction = ({ txn, isBank, renderRecon }) => {
  let typeOfError = 'Incorrect';
  let type = 'book';
  if (isBank) {
    typeOfError = 'Missing';
    type = 'bank';
  }

  return (
    <div>
      <span>{`${txn.date} | ${txn.description} | ${txn.amount} | Cutoff: ${txn.cutoff} | ${typeOfError}: ${txn[typeOfError.toLowerCase()]}`}</span>
      <button type="button" onClick={() => updateCutoff(txn._id, type, renderRecon, !txn.cutoff)}>Cutoff</button>
      <button type="button" onClick={() => updateIncorrect(txn._id, type, renderRecon, !txn[typeOfError.toLowerCase()])}>{typeOfError}</button>
      <button type="button">Define Group</button>
    </div>
  );
};

export default Transaction;

Transaction.propTypes = {
  txn: object.isRequired,
  isBank: bool.isRequired,
  renderRecon: func.isRequired,
};