import React, { Component } from 'react';
import { Button } from '@material-ui/core';
// import { PropTypes } from 'prop-types';

class FileInput extends Component {
  state = {
    content: '',
  }

  handleFileInput = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      this.setState({
        content,
      });
    };
    reader.readAsText(file);
  }

  render() {
    const { content } = this.state;
    return (
      <div>
        <label htmlFor="file-upload-input">
          <input
            accept=".csv"
            type="file"
            id="file-upload-input"
            style={{ display: 'none' }}
            onChange
          />
          <Button
            variant="contained"
            component="span"
          >
            Upload
          </Button>
        </label>
        <p>{content}</p>
      </div>
    );
  }
}

export default FileInput;
