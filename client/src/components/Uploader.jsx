/* eslint-disable object-curly-newline */
import React from 'react';
import { func } from 'prop-types';
import '../styles/Uploader.css';
import FileInput from './FileInput';
import Switcher from './Switcher';
import TextInput from './TextInput';
import { createReconFromSourceFiles } from '../utilities/httpRequests';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankFile: { name: '' },
      bookFile: { name: '' },
      endBook: 0,
      endBank: 0,
      bankName: '',
      ready: false,
      error: false,
    };
    this.handleViewSwitch = props.handleViewSwitch;
    this.chooseFile = this.chooseFile.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleTextInputs = this.handleTextInputs.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  handleFileSubmit(e) {
    e.preventDefault();
    const { bankFile, bookFile, endBook, endBank, bankName } = this.state;
    if (!bankFile || !bookFile) {
      alert('Please submit both a bank and book file');
    } else {
      createReconFromSourceFiles(bankFile, bookFile, endBank, endBook, bankName)
        .then(() => {
          this.setState({ ready: true, error: false });
        })
        .catch((err) => {
          this.setState({ error: true });
          console.error(err);
        });
    }
  }

  chooseFile(e) {
    const type = e.target.id.slice(0, 4);
    document.getElementById(`${type}-upload`).click();
  }

  handleTextInputs(e) {
    const stateCopy = this.state;
    stateCopy[e.target.id] = e.target.value;
    this.setState(stateCopy);
  }

  handleFiles() {
    const stateCopy = this.state;
    const bankFile = document.getElementById('bank-upload').files[0];
    const bookFile = document.getElementById('book-upload').files[0];
    if (bankFile) {
      stateCopy.bankFile = bankFile;
    }
    if (bookFile) {
      stateCopy.bookFile = bookFile;
    }
    this.setState(stateCopy);
  }

  render() {
    const { bankFile, bookFile, ready, error } = this.state;
    const inputFields = ['Ending book', 'Ending bank', 'Bank name'];
    const inputIds = ['endBook', 'endBank', 'bankName'];
    return (
      <div id="uploader-container">
        <div id="upload-btn-area">
          <Switcher view="list" page="upload" viewNum={3} handleViewSwitch={this.handleViewSwitch} />
          <Switcher view="home" page="upload" viewNum={0} handleViewSwitch={this.handleViewSwitch} />
        </div>
        <div id="form-area">
          <form>
            <FileInput
              type="bank"
              fileName={bankFile.name}
              chooseFile={this.chooseFile}
              handleFiles={this.handleFiles}
            />
            <FileInput
              type="book"
              fileName={bookFile.name}
              chooseFile={this.chooseFile}
              handleFiles={this.handleFiles}
            />
            {inputFields.map((field, i) => (
              <TextInput
                key={inputIds[i]}
                id={inputIds[i]}
                field={field}
                value={this.state[inputIds[i]]}
                handleTextInputs={this.handleTextInputs}
              />
            ))}
            <button id="submit-btn" hidden={ready} type="button" onClick={this.handleFileSubmit}>Submit</button>
          </form>
          <div hidden={!ready}>
            <p>Success</p>
            <Switcher view="reconciliation" page="upload" viewNum={2} handleViewSwitch={this.handleViewSwitch} />
          </div>
          <div hidden={!error}>
            <p>Error</p>
            <p>Please check that two source files have been selected and a bank name filled in</p>
          </div>
        </div>
      </div>
    );
  }
}

Uploader.propTypes = {
  handleViewSwitch: func.isRequired,
};
