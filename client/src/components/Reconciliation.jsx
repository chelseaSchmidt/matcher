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
        this.setState({
          unreconciled: data.endBank - data.endBook,
          bankTxns: data.bankTxns,
          bookTxns: data.bookTxns,
          mismatches: getMismatchList(data.bankTxns, data.bookTxns),
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
    const { unreconciled, mismatches, mismatchGroup } = this.state;
    return (
      <div>
        <Switcher
          view="list"
          text="See All Reconciliations"
          handleViewSwitch={this.handleViewSwitch}
        />
        <Switcher
          view="home"
          text="Back to Matcher Home"
          handleViewSwitch={this.handleViewSwitch}
        />
        <p>{`Unreconciled Balance: ${unreconciled}`}</p>
        <div>
          {mismatches.map((amount) => <button id={`${amount}-btn`} type="button" key={`${amount}-btn`} onClick={this.handleClick}>{amount}</button>)}
        </div>
        <div id="mismatcher">
          <div id="bank-mismatches">
            <p>Bank Mismatches</p>
            {mismatchGroup.bank.map((txn) => {
              return <div>{`${txn.date} | ${txn.description} | ${txn.amount}`}</div>;
            })}
          </div>
          <div id="book-mismatches">
            <p>Book Mismatches</p>
            {mismatchGroup.book.map((txn) => {
              return <div>{`${txn.date} | ${txn.description} | ${txn.amount}`}</div>;
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
