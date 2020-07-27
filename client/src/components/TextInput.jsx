import React from 'react';
import { string, number, func } from 'prop-types';

const TextInput = ({ field, id, value, handleTextInputs }) => {
  return (
    <div key={id}>
      <label htmlFor={id}>{`${field} balance`}</label>
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
  value: number.isRequired,
  handleTextInputs: func.isRequired,
};
