import React from 'react';
import { string, func } from 'prop-types';

const FileInput = ({
  type,
  fileName,
  chooseFile,
  handleFiles,
}) => (
  <div className="file-input-container">
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
    <button className="uploader-btn" type="button" id={`${type}-btn`} onClick={chooseFile}>Choose File</button>
  </div>
);

export default FileInput;

FileInput.propTypes = {
  type: string.isRequired,
  fileName: string.isRequired,
  chooseFile: func.isRequired,
  handleFiles: func.isRequired,
};
