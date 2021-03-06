import React from 'react';
import { func } from 'prop-types';
import axios from 'axios';
import Switcher from './Switcher';
import Transaction from './Transaction';
import { getMismatchGroup, createRecon } from '../utilities/reconAnalyzers';
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
    if (error) { console.error(error); }
    // render new recon
    else if (!this.targetRecon) {
      axios.get('/last-recon')
        .then(({ data }) => {
          this.targetRecon = createRecon(data);
          this.setState(this.targetRecon);
        })
        .catch((err) => { console.error(err); });
    // render saved recon
    } else if (!modified) {
      this.setState(createRecon(this.targetRecon));
    // re-render modified recon
    } else {
      const { amountSelected } = this.state;
      const recon = createRecon(modified);
      recon.mismatchGroup = getMismatchGroup(modified.bankTxns, modified.bookTxns, amountSelected);
      this.setState(recon);
    }
  }

  render() {
    const {
      unreconciled,
      mismatches,
      mismatchGroup,
      comparedDiff,
      remainingDiff,
      cutoffAmt,
      incorrectAmt,
      amountSelected,
    } = this.state;

    let toggleReconciled = 'non-zero';
    let hideMismatcher = true;
    let reconciled = false;
    const netUnexp = comparedDiff - cutoffAmt - incorrectAmt;
    if (netUnexp < 0.02 && netUnexp > -0.02) {
      toggleReconciled = 'zero';
      reconciled = true;
    }
    if (amountSelected) {
      hideMismatcher = false;
    }

    return (
      <div id="recon-container">
        <div id="recon-nav-area">
          <Switcher view="list" page="recon" viewNum={3} handleViewSwitch={this.handleViewSwitch} />
          <Switcher view="home" page="recon" viewNum={0} handleViewSwitch={this.handleViewSwitch} />
        </div>
        <div id="recon-summary">
          <div id="summary-fields">
            <div>Unreconciled Balance:</div>
            <div>Total Caused By Compared Transactions:</div>
            <div className="subtotal">Remaining (Beginning Balance) Difference:</div>
            <div>Difference Explained by Date Range:</div>
            <div>Difference From Incorrect or Missing:</div>
            <div className="subtotal">Net Unexplained Difference:</div>
          </div>
          <div id="summary-numbers">
            <div>{`$${unreconciled.toFixed(2)}`}</div>
            <div>{`$${comparedDiff.toFixed(2)}`}</div>
            <div className="subtotal">{`$${remainingDiff.toFixed(2)}`}</div>
            <div>{`$${cutoffAmt.toFixed(2)}`}</div>
            <div>{`$${incorrectAmt.toFixed(2)}`}</div>
            <div id="net-diff" className={`${toggleReconciled} subtotal`}>{`$${netUnexp.toFixed(2)}`}</div>
          </div>
        </div>
        <div hidden={!reconciled} id="reconciled-message">
          Account reconciled!
        </div>
        <div id="mismatch-btn-area">
          <div>Transaction Groups Identified As Causing Difference:</div>
          {mismatches.map((amount) => <button id={`${amount}-btn`} className="mismatch-btn" type="button" key={`${amount}-btn`} onClick={this.handleClick}>{`$${amount}`}</button>)}
        </div>
        <div id="mismatcher" hidden={hideMismatcher}>
          <div id="bank-mismatches" hidden={hideMismatcher}>
            <p>Transactions in Bank</p>
            {mismatchGroup.bank.map((txn, i) => (
              <Transaction
                key={`${i}-${txn.description}`}
                txn={txn}
                isBank={true}
                renderRecon={this.renderRecon}
              />
            ))}
          </div>
          <div id="book-mismatches" hidden={hideMismatcher}>
            <p>Transactions In Book</p>
            {mismatchGroup.book.map((txn, i) => (
              <Transaction
                key={`${i}-${txn.description}`}
                txn={txn}
                isBank={false}
                renderRecon={this.renderRecon}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Reconciliation.propTypes = {
  handleViewSwitch: func.isRequired,
};
