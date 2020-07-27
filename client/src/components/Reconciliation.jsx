import React from 'react';
import { func } from 'prop-types';
import Switcher from './Switcher';

const Reconciliation = ({ handleViewSwitch }) => {
  return (
    <div>
      <Switcher
        view="list"
        text="See All Reconciliations"
        handleViewSwitch={handleViewSwitch}
      />
      <Switcher
        view="home"
        text="Back to Matcher Home"
        handleViewSwitch={handleViewSwitch}
      />
      Reconciliation View In Progress
    </div>
  );
};

export default Reconciliation;

Reconciliation.propTypes = {
  handleViewSwitch: func.isRequired,
};
