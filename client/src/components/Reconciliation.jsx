import React from 'react';
import { func } from 'prop-types';
import axios from 'axios';
import Switcher from './Switcher';
import Transaction from './Transaction';
import { getMismatchList, getMismatchGroup, createRecon } from '../utilities/reconAnalyzers';
import '../styles/Reconciliation.css';

export default class Reconciliation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unreconciled: 0,
      comparedDiff: 0,
      remainingDiff: 0,
      bankTxns: [],
      bookTxns: [],
      mismatches: [],
      mismatchGroup: { bank: [], book: [] },
    };
    this.handleViewSwitch = props.handleViewSwitch;
    this.handleClick = this.handleClick.bind(this);
    this.targetRecon = props.targetRecon;
  }

  componentDidMount() {
    if (!this.targetRecon) {
      axios.get('/last-recon')
        .then(({ data }) => {
          const { mismatchList, mismatchTotal } = getMismatchList(data.bankTxns, data.bookTxns);
          const recon = createRecon(data, mismatchList, mismatchTotal);
          this.setState(recon);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const data = this.targetRecon;
      const { mismatchList, mismatchTotal } = getMismatchList(data.bankTxns, data.bookTxns);
      const recon = createRecon(data, mismatchList, mismatchTotal);
      this.setState(recon);
    }
  }

  handleClick(e) {
    const { bankTxns, bookTxns } = this.state;
    const amount = Number(e.target.id.slice(0, -4));
    this.setState({
      mismatchGroup: getMismatchGroup(bankTxns, bookTxns, amount),
    });
  }

  render() {
    const { unreconciled, mismatches, mismatchGroup, comparedDiff, remainingDiff } = this.state;
    return (
      <div>
        <Switcher view="list" viewNum={3} handleViewSwitch={this.handleViewSwitch} />
        <Switcher view="home" viewNum={0} handleViewSwitch={this.handleViewSwitch} />
        <p>{`Unreconciled Balance: $${unreconciled.toFixed(2)}`}</p>
        <p>{`Total Caused By Compared Transactions: $${comparedDiff.toFixed(2)}`}</p>
        <p>{`Remaining (Beginning Balance) Difference: $${remainingDiff.toFixed(2)}`}</p>
        <div>
          {mismatches.map((amount) => <button id={`${amount}-btn`} type="button" key={`${amount}-btn`} onClick={this.handleClick}>{amount}</button>)}
        </div>
        <div id="mismatcher">
          <div id="bank-mismatches">
            <p>Transactions in Bank</p>
            {mismatchGroup.bank.map((txn, i) => {
              return <Transaction key={`${i}-${txn.description}`} txn={txn} isBank={true} />;
            })}
          </div>
          <div id="book-mismatches">
            <p>Transactions In Book</p>
            {mismatchGroup.book.map((txn, i) => {
              return <Transaction key={`${i}-${txn.description}`} txn={txn} isBank={false} />;
            })}
          </div>
        </div>
      </div>
    );
  }
};

Reconciliation.propTypes = {
  handleViewSwitch: func.isRequired,
};
