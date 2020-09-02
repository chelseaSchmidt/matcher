import React from 'react';
import { string, func, number } from 'prop-types';

const Switcher = ({
  view,
  viewNum,
  page,
  handleViewSwitch,
}) => {
  const labels = [
    'Back to Matcher Home',
    'Start a New Reconciliation',
    'Start Reconciliation',
    'Go To Saved Reconciliations',
  ];
  return (
    <button
      className={`${page}-switcher`}
      type="button"
      id={`${view}-btn`}
      onClick={handleViewSwitch}
    >
      {labels[viewNum]}
    </button>
  );
};

export default Switcher;

Switcher.propTypes = {
  view: string.isRequired,
  viewNum: number.isRequired,
  handleViewSwitch: func.isRequired,
  page: string.isRequired,
};
