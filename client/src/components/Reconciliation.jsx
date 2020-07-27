import React from 'react';
import { func } from 'prop-types';
import axios from 'axios';
import Switcher from './Switcher';
import { getMismatchList, getMismatchGroup } from '../utilities/getMismatches';

export default class Reconciliation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unreconciled: 0,
      bankTxns: [],
      bookTxns: [],
      mismatches: [],
      mismatchGroup: null,
    };
    this.handleViewSwitch = props.handleViewSwitch;
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

  render() {
    const { unreconciled, mismatches } = this.state;
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
          {mismatches.map((amount) => <div key={amount}>{amount}</div>)}
        </div>
        <div id="mismatcher">
          <div id="bank-mismatches"></div>
          <div id="book-mismatches"></div>
        </div>
      </div>
    );
  }
};

Reconciliation.propTypes = {
  handleViewSwitch: func.isRequired,
};
