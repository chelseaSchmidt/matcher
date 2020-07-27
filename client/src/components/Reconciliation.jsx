import React from 'react';
import { func } from 'prop-types';
import axios from 'axios';
import Switcher from './Switcher';

export default class Reconciliation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unreconciled: 0,
    };
    this.handleViewSwitch = props.handleViewSwitch;
  }

  componentDidMount() {
    axios.get('/last-recon')
      .then(({ data }) => {
        this.setState({
          unreconciled: data.endBank - data.endBook,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { unreconciled } = this.state;
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
        <div>
          <p>Unreconciled Balance:</p>
          <div>{unreconciled}</div>
        </div>
      </div>
    );
  }
};

Reconciliation.propTypes = {
  handleViewSwitch: func.isRequired,
};
