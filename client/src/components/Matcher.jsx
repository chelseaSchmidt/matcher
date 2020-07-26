import React from 'react';
import '../styles/Matcher';

export default class Matcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankFile: null,
      bookFile: null,
    };
    this.handleFiles = this.handleFiles.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  handleFileSubmit() {
    const bankFile = document.getElementById('bank-upload').files[0];
    const bookFile = document.getElementById('book-upload').files[0];
    if (!bankFile || !bookFile) {
      alert('Please submit both a bank and book file');
    }
  }

  chooseFile(e) {
    const type = e.target.id.slice(0, 4);
    document.getElementById(`${type}-upload`).click();
  }

  handleFiles() {
    const stateCopy = this.state;
    const bankFile = document.getElementById('bank-upload').files[0];
    const bookFile = document.getElementById('book-upload').files[0];
    if (bankFile) {
      stateCopy.bankFile = bankFile.name;
    }
    if (bookFile) {
      stateCopy.bookFile = bookFile.name;
    }
    this.setState(stateCopy);
  }

  render() {
    const { bankFile, bookFile } = this.state;
    return (
      <div>
        <form>
          <div>
            <label htmlFor="bank-upload">Upload Bank File:</label>
            <input type="file" id="bank-upload" name="bank-upload" accept=".csv" onChange={this.handleFiles} />
            <div>{bankFile}</div>
            <button type="button" id="bank-btn" onClick={this.chooseFile}>Choose File</button>
          </div>

          <div>
            <label htmlFor="book-upload">Upload Book File:</label>
            <input type="file" id="book-upload" name="book-upload" accept=".csv" onChange={this.handleFiles} />
            <div>{bookFile}</div>
            <button type="button" id="book-btn" onClick={this.chooseFile}>Choose File</button>
          </div>

          <button type="button" onClick={this.handleFileSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
