import React from 'react';
import { string, func } from 'prop-types';

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

Switcher.propTypes = {
  view: string.isRequired,
  text: string.isRequired,
  handleViewSwitch: func.isRequired,
};
