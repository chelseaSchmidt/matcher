import React from 'react';
import { func } from 'prop-types';
import axios from 'axios';
import Switcher from './Switcher';
import { getMismatchList, getMismatchGroup } from '../utilities/getMismatches';
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
  }

  componentDidMount() {
    axios.get('/last-recon')
      .then(({ data }) => {
        const { mismatchList, mismatchTotal } = getMismatchList(data.bankTxns, data.bookTxns);
        this.setState({
          unreconciled: data.endBank - data.endBook,
          bankTxns: data.bankTxns,
          bookTxns: data.bookTxns,
          mismatches: mismatchList,
          comparedDiff: mismatchTotal,
          remainingDiff: data.endBank - data.endBook - mismatchTotal,
        });
      })
      .catch((err) => {
        console.error(err);
      });
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
        <Switcher
          view="list"
          text="See Saved Reconciliations"
          handleViewSwitch={this.handleViewSwitch}
        />
        <Switcher
          view="home"
          text="Back to Matcher Home"
          handleViewSwitch={this.handleViewSwitch}
        />
        <p>{`Unreconciled Balance: $${unreconciled.toFixed(2)}`}</p>
        <p>{`Total Caused By Compared Transactions: $${comparedDiff.toFixed(2)}`}</p>
        <p>{`Remaining (Beginning Balance) Difference: $${remainingDiff.toFixed(2)}`}</p>
        <div>
          {mismatches.map((amount) => <button id={`${amount}-btn`} type="button" key={`${amount}-btn`} onClick={this.handleClick}>{amount}</button>)}
        </div>
        <div id="mismatcher">
          <div id="bank-mismatches">
            <p>Transactions in Bank</p>
            {mismatchGroup.bank.map((txn) => {
              return <div>{`${txn.date} | ${txn.description} | ${txn.amount}`}</div>;
            })}
          </div>
          <div id="book-mismatches">
            <p>Transactions In Book</p>
            {mismatchGroup.book.map((txn, i) => {
              return <div key={`${i}-${txn.description}`}>{`${txn.date} | ${txn.description} | ${txn.amount}`}</div>;
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
