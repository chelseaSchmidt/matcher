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
      .then((res) => {
        // subtract ending bank from ending book and set state for unreconciled to diff
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
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
        Reconciliation View In Progress
      </div>
    );
  }
};

Reconciliation.propTypes = {
  handleViewSwitch: func.isRequired,
};
