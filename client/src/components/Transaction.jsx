import React from 'react';
import {string, object, bool } from 'prop-types';

const Transaction = ({ txn, isBank }) => {
  let button3 = 'Incorrect';
  if (isBank) {
    button3 = 'Missing';
  }
  return (
    <div>
      <span>{`${txn.date} | ${txn.description} | ${txn.amount}`}</span>
      <button type="button">Cutoff</button>
      <button type="button">Define Group</button>
      <button type="button">{button3}</button>
    </div>
  );
};

export default Transaction;

Transaction.propTypes = {
  txn: object.isRequired,
  isBank: bool.isRequired,
};