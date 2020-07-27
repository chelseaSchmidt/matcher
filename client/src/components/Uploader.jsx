import React from 'react';
import { func } from 'prop-types';
import axios from 'axios';
import '../styles/Uploader.css';
import FileInput from './FileInput';
import Switcher from './Switcher';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankFile: { name: '' },
      bookFile: { name: '' },
      begBook: 0,
      endBook: 0,
      begBank: 0,
      endBank: 0,
      ready: false,
    };
    this.handleViewSwitch = props.handleViewSwitch;
    this.chooseFile = this.chooseFile.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleTextInputs = this.handleTextInputs.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  handleFileSubmit(e) {
    e.preventDefault();

    const {
      bankFile,
      bookFile,
      begBook,
      endBook,
      begBank,
      endBank,
    } = this.state;

    if (!bankFile || !bookFile) {
      alert('Please submit both a bank and book file');
    } else {
      const formData = new FormData();
      formData.append('sourceFiles', bankFile);
      formData.append('sourceFiles', bookFile);
      formData.append('begBook', begBook);
      formData.append('endBook', endBook);
      formData.append('begBank', begBank);
      formData.append('endBank', endBank);

      axios({
        method: 'post',
        url: '/files',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(() => {
          this.setState({
            ready: true,
          });
        })
        .catch((err) => {
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
    const { bankFile, bookFile, ready } = this.state;
    const inputFields = ['Beginning book', 'Beginning bank', 'Ending book', 'Ending bank'];
    const inputIds = ['begBook', 'begBank', 'endBook', 'endBank'];
    return (
      <div>
        <Switcher
          view="list"
          text="See All Reconciliations"
          handleViewSwitch={this.handleViewSwitch}
        />
        <Switcher
          view="home"
          text="Back to Matcher Home"
          handleViewSwitch={this.handleViewSwitch}
        />
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
          {inputFields.map((field, i) => {
            return (
              <div key={inputIds[i]}>
                <label htmlFor={inputIds[i]}>{`${field} balance`}</label>
                <input
                  type="text"
                  id={inputIds[i]}
                  name={inputIds[i]}
                  onChange={this.handleTextInputs}
                  value={this.state[inputIds[i]]}
                />
              </div>
            );
          })}
          <button type="button" onClick={this.handleFileSubmit}>Submit</button>
        </form>
        <div hidden={!ready}>
          <p>Success</p>
          <Switcher
            view="reconciliation"
            text="Start Reconciliation"
            handleViewSwitch={this.handleViewSwitch}
          />
        </div>

      </div>
    );
  }
}

Uploader.propTypes = {
  handleViewSwitch: func.isRequired,
};
