import React from 'react';
import axios from 'axios';
import '../styles/Matcher.css';
import FileInput from './FileInput';

export default class Matcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankFile: null,
      bookFile: null,
    };
    this.chooseFile = this.chooseFile.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
  }

  handleFileSubmit(e) {
    e.preventDefault();
    const bankFile = document.getElementById('bank-upload').files.item(0);
    const bookFile = document.getElementById('book-upload').files.item(0);
    if (!bankFile || !bookFile) {
      alert('Please submit both a bank and book file');
    } else {
      const formData = new FormData();
      formData.append('sourceFiles', bankFile);
      formData.append('sourceFiles', bookFile);
      axios({
        method: 'post',
        url: '/files',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
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
          <FileInput type="bank" fileName={bankFile} chooseFile={this.chooseFile} handleFiles={this.handleFiles} />
          <FileInput type="book" fileName={bookFile} chooseFile={this.chooseFile} handleFiles={this.handleFiles} />
          <button type="button" onClick={this.handleFileSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
