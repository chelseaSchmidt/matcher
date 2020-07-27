import React from 'react';
import PropTypes from 'prop-types';

const Switcher = ({ view, text, handleViewSwitch }) => {
  return (
    <button
      type="button"
      id={`${view}-btn`}
      onClick={handleViewSwitch}
    >
      {text}
    </button>
  );
};

export default Switcher;