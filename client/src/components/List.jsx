import React from 'react';
import PropTypes from 'prop-types';
import Switcher from './Switcher';

const List = ({ handleViewSwitch }) => {
  return (
    <div>
      <Switcher
        view={'uploader'}
        text="Start a New Reconciliation"
        handleViewSwitch={handleViewSwitch}
      />
      <Switcher
        view={'home'}
        text="Back to Matcher Home"
        handleViewSwitch={handleViewSwitch}
      />
      <p>List View In Progress</p>
    </div>
  );
};

export default List;
