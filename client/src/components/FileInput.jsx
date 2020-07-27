import React from 'react';
import { string, func } from 'prop-types';

const FileInput = ({
  type,
  fileName,
  chooseFile,
  handleFiles,
}) => {
  return (
    <div>
      <label htmlFor={`${type}-upload`}>{`Upload ${type} file:`}</label>
      <input
        type="file"
        id={`${type}-upload`}
        name={`${type}-upload`}
        className="file-input"
        accept=".csv"
        onChange={handleFiles}
      />
      <div>{fileName}</div>
      <button type="button" id={`${type}-btn`} onClick={chooseFile}>Choose File</button>
    </div>
  );
};

export default FileInput;

FileInput.propTypes = {
  type: string.isRequired,
  fileName: string,
  chooseFile: func.isRequired,
  handleFiles: func.isRequired,
};
