import React, { Component } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

class responseUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: []
    };
  }

  handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Assuming only one sheet
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      
      // Convert excelData to array of objects
      const headers = excelData[0];
      const formattedData = excelData.slice(1).map(row => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      });
      
      console.log(formattedData);

      this.setState({ jsonData: formattedData });
    };
    reader.readAsArrayBuffer(file);
  };

  
  handleSave = async () => {
    try {
      const response = await axios.post('YOUR_ENDPOINT', this.state.jsonData, {
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          this.setState({ progress: percentCompleted });
        }
      });
      console.log('Data saved successfully:', response.data);
      // Optionally, you can reset the state or perform any other actions after saving
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  render() {
    return (
      <div>
        <h2>Excel to JSON Converter</h2>
        <button onClick={this.handleSave}>Save</button>
        <input type="file" onChange={this.handleFileUpload} accept=".xlsx,.xls" />
        {this.state.jsonData && (
          <div>
            <h3>JSON Output:</h3>
            <div>Progress: {this.state.progress}%</div>
            {/* <pre>{JSON.stringify(this.state.jsonData, null, 2)}</pre> */}
          </div>
        )}
      </div>
    );
  }
}

export default responseUploader;
