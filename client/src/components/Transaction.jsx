/* eslint-disable no-underscore-dangle */
import React from 'react';
import { object, bool, func } from 'prop-types';
import moment from 'moment';
import { updateCutoff, updateIncorrect } from '../utilities/httpRequests';

const Transaction = ({ txn, isBank, renderRecon }) => {
  let typeOfError = 'Incorrect';
  let type = 'book';
  let cutoffState = 'unmarked';
  let errorState = 'unmarked';
  if (isBank) {
    typeOfError = 'Missing';
    type = 'bank';
  }
  if (txn.cutoff) {
    cutoffState = 'marked';
  }
  if (txn[typeOfError.toLowerCase()]) {
    errorState = 'marked';
  }

  return (
    <div className="txn-row">
      <span className="date-cell cell">{moment(txn.date).format('MMM Do YYYY')}</span>
      <span className="desc-cell cell">{txn.description}</span>
      <span className="amt-cell cell">{`$${txn.amount}`}</span>
      {/* <span className="cutoff-cell cell">{`Date Out of Range: ${txn.cutoff}`}</span>
      <span className="error-cell cell">{`${typeOfError}: ${txn[typeOfError.toLowerCase()]}`}</span> */}

      <button className={`${cutoffState}-btn`} type="button" onClick={() => updateCutoff(txn._id, type, renderRecon, !txn.cutoff)}>Date Out of Range</button>

      <button className={`${errorState}-btn`} type="button" onClick={() => updateIncorrect(txn._id, type, renderRecon, !txn[typeOfError.toLowerCase()])}>{typeOfError}</button>

      <button className="unmarked-btn" type="button">Define Group</button>
    </div>
  );
};

export default Transaction;

Transaction.propTypes = {
  txn: object.isRequired,
  isBank: bool.isRequired,
  renderRecon: func.isRequired,
};
