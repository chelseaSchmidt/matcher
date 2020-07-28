/* eslint-disable object-curly-newline */
import React from 'react';
import { string, number, func, oneOfType } from 'prop-types';

const TextInput = ({ field, id, value, handleTextInputs }) => {
  let label = `${field} balance`;
  if (id === 'bankName') {
    label = field;
  }
  return (
    <div key={id}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        onChange={handleTextInputs}
        value={value}
      />
    </div>
  );
};

export default TextInput;

TextInput.propTypes = {
  field: string.isRequired,
  id: string.isRequired,
  value: oneOfType([string, number]).isRequired,
  handleTextInputs: func.isRequired,
};
