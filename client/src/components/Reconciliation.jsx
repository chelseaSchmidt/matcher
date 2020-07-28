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
      amountSelected: null,
      cutoffAmt: 0,
      incorrectAmt: 0,
    };
    this.handleViewSwitch = props.handleViewSwitch;
    this.handleClick = this.handleClick.bind(this);
    this.renderRecon = this.renderRecon.bind(this);
    this.targetRecon = props.targetRecon;
  }

  componentDidMount() {
    this.renderRecon();
  }

  handleClick(e) {
    const { bankTxns, bookTxns } = this.state;
    const amount = Number(e.target.id.slice(0, -4));
    this.setState({
      mismatchGroup: getMismatchGroup(bankTxns, bookTxns, amount),
      amountSelected: amount,
    });
  }

  renderRecon(error, modified) {
    if (error) {
      console.error(error);

    } else if (!this.targetRecon) {
      axios.get('/last-recon')
        .then(({ data }) => {
          const { mismatchList, mismatchTotal } = getMismatchList(data.bankTxns, data.bookTxns);
          const recon = createRecon(data, mismatchList, mismatchTotal);
          this.setState(recon);
        })
        .catch((err) => {
          console.error(err);
        });

    } else if (!modified) {
      const data = this.targetRecon;
      const { mismatchList, mismatchTotal } = getMismatchList(data.bankTxns, data.bookTxns);
      const recon = createRecon(data, mismatchList, mismatchTotal);
      this.setState(recon);

    } else {
      const { amountSelected } = this.state;
      const { mismatchList, mismatchTotal } = getMismatchList(modified.bankTxns, modified.bookTxns);
      const recon = createRecon(modified, mismatchList, mismatchTotal);
      recon.mismatchGroup = getMismatchGroup(modified.bankTxns, modified.bookTxns, amountSelected);
      this.setState(recon);
    }
  }

  render() {
    const { unreconciled, mismatches, mismatchGroup, comparedDiff, remainingDiff, cutoffAmt, incorrectAmt } = this.state;
    return (
      <div>
        <Switcher view="list" viewNum={3} handleViewSwitch={this.handleViewSwitch} />
        <Switcher view="home" viewNum={0} handleViewSwitch={this.handleViewSwitch} />
        <div id="recon-summary">
          <div>{`Unreconciled Balance: $${unreconciled.toFixed(2)}`}</div>
          <div>{`Remaining (Beginning Balance) Difference: $${remainingDiff.toFixed(2)}`}</div>
          <div>{`Total Caused By Compared Transactions: $${comparedDiff.toFixed(2)}`}</div>
          <div>{`Difference Explained by Cutoff: $${cutoffAmt.toFixed(2)}`}</div>
          <div>{`Difference From Incorrect or Missing: $${incorrectAmt.toFixed(2)}`}</div>
          <div>{`Net Unexplained Difference: $${(comparedDiff - cutoffAmt - incorrectAmt).toFixed(2)}`}</div>
        </div>
        <div>
          {mismatches.map((amount) => <button id={`${amount}-btn`} type="button" key={`${amount}-btn`} onClick={this.handleClick}>{amount}</button>)}
        </div>
        <div id="mismatcher">
          <div id="bank-mismatches">
            <p>Transactions in Bank</p>
            {mismatchGroup.bank.map((txn, i) => {
              return <Transaction key={`${i}-${txn.description}`} txn={txn} isBank={true} renderRecon={this.renderRecon} />;
            })}
          </div>
          <div id="book-mismatches">
            <p>Transactions In Book</p>
            {mismatchGroup.book.map((txn, i) => {
              return <Transaction key={`${i}-${txn.description}`} txn={txn} isBank={false} renderRecon={this.renderRecon} />;
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
