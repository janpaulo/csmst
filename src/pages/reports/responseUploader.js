import React, { Component } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {
  Button,
  Typography,
  Box
} from '@mui/material'
import '../../App.css';
import DragDropFile from "./DragDropFile "
import Dialog from '../sharedFile/dialogBox/dialog'
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import moment from  'moment'

import {
  Grid
} from '@mui/material'

class responseUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: [],
      successSave: [],
      errorSave: [],
      dataCountUpload: {},
      inputFileValue: '',
      failedFileUpload: [],
      dragActive: false,
      open: false,
      loading: false,
      success: false,
      opensnack: false,
      snackMessage: "",
      severityColor:"",

    };
    this.inputRef = React.createRef();
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }


  formatDate = (timestamp) => {
    const dateString =timestamp;
    var formattedDate = moment(new Date(Math.round((dateString - 25569)*86400*1000))).format('MM/DD/YYYY HH:mm:ss')
    return formattedDate;
  }
  // Function to pad zero if single digit
  padZero = (num) => {
    return (num < 10 ? '0' : '') + num;
  }



  handleSave = async () => {
    try {
      const failedSaves = [];
      const successSaves = [];
      this.setState({ success: false, loading: true });
  
      for (const data of this.state.jsonData) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}ConductedSurvey`, data, {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              this.setState({ progress: percentCompleted });
            },
          });
  
          if (response.data.success) {
            successSaves.push(response.data);
          } else {
            failedSaves.push({ object: data, error: response.data.message });
          }
        } catch (error) {
          failedSaves.push({ object: data, error });
          console.error('Error saving data:', data, error);
        }
      }
  
      const unsuccessfulCharacters = failedSaves.map(failedSave => failedSave.object);
  
      this.setState({ opensnack: true, snackMessage: "File downloaded successfully!", severityColor: "success" });
      this.setState({ successSave: successSaves, errorSave: unsuccessfulCharacters, open: true, inputFileValue: '', jsonData: [] });
    } catch (error) {
      this.setState({ opensnack: true, snackMessage: 'Error during save: '+ error, severityColor: "error" });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleFile = async (e, files, process) => {
    var file = ""
    if (process === "drag") {

      this.setState({ inputFileValue: e.dataTransfer.files[0] });
      file = e.dataTransfer.files[0];
    } else {
      this.setState({ inputFileValue: e.target.files[0] });
      file = e.target.files[0];
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Assuming only one sheet
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Remove rows with null values
      const filteredData = excelData.filter(row => row.some(cell => cell !== null && cell !== ''));

      // Convert filteredData to array of objects
      const headers = filteredData[0];
      const formattedData = filteredData.slice(1).map(row => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      });
      const filterData = formattedData.filter(response => {
        const requiredProperties = ["officeId", "cc1", "cc2", "cc3", "sqd0", "sqd1", "sqd2", "sqd3", "sqd4", "sqd5", "sqd6", "sqd7", "sqd8", "start_date", "end_date", "comments_suggestion", "commendation", "service_availed"];
        return requiredProperties.every(prop => response[prop] !== undefined);
      });

      const filterFailedData = formattedData.filter(response => {
      // Combine all required properties into a single condition for efficiency
      const requiredProperties = ["officeId", "cc1", "cc2", "cc3", "sqd0", "sqd1", "sqd2", "sqd3", "sqd4", "sqd5", "sqd6", "sqd7", "sqd8", "start_date", "end_date", "comments_suggestion", "commendation", "service_availed"];
      return requiredProperties.some(prop => response[prop] === undefined || response[prop] === null);
    });
      // const filterFailedData = formattedData.filter(response => response.officeId === undefined);

      this.setState({ failedFileUpload: filterFailedData })
      const transformedData = {
        "reponseExcelArray": filterData.map(entry => ({
          "surveyFormId": 1,
          "officeId": entry["officeId"],
          "surveySourceId": 6,
          "surveyStartDate": this.formatDate(entry.start_date), // Fill this with appropriate date and time
          "surveyEndDate": this.formatDate(entry.end_date), // Fill this with appropriate date and time
          "surveyFormResponses": [
            {
              "questionId": 1,
              "optionId": "",
              "freeText": this.formatDate(entry.start_date) // Format the date accordingly
            },
            {
              "questionId": 3,
              "optionId": entry["client_type"],
              "freeText": ""
            },
            {
              "questionId": 4,
              "optionId": "",
              "freeText": entry["contact_no"]
            },
            {
              "questionId": 5,
              "optionId": "",
              "freeText": entry["email_address"]
            },
            {
              "questionId": 6,
              "optionId": "",
              "freeText": entry["age"]
            },
            {
              "questionId": 7,
              "optionId": "",
              "freeText": entry["sex"]
            },
            {
              "questionId": 8,
              "optionId": entry["type_of_service"] === "1" ? "9" : entry["type_of_service"] === "2" ? "8" : entry["type_of_service"] === "3" ? "10" :  entry["type_of_service"] === "4" ? "11" : entry["type_of_service"] === "5" ? "7" : entry["type_of_service"] === "6" ? "12" : entry["type_of_service"] === "7" ? "45" :"42",
              "freeText": ""
            },
            {
              "questionId": 9,
              "optionId": entry["service_availed"],
              "freeText": ""
            },
            {
              "questionId": 12,
              "optionId": entry["cc1"] === "1" ? "51" : entry["cc1"] === "2" ? "48" : entry["cc1"] === "3" ? "49" : "50",
              "freeText": ""
            },
            {
              "questionId": 13,
              "optionId": entry["cc2"] === "1" ? "54" : entry["cc2"] === "2" ? "52" : entry["cc2"] === "3" ? "55" : "53",
              "freeText": ""
            },
            {
              "questionId": 14,
              "optionId": entry["cc3"] === "1" ? "58" : entry["cc3"] === "2" ? "56" : "57",
              "freeText": ""
            },
            {
              "questionId": 17,
              "optionId": entry["sqd0"] === "0" ? "64" : entry["sqd0"] === "1" ? "63" : entry["sqd0"] === "2" ? "62" : entry["sqd0"] === "3" ? "61" : entry["sqd0"] === "4" ? "60" : "59"
            },
            {
              "questionId": 18,
              "optionId": entry["sqd1"] === "0" ? "64" : entry["sqd1"] === "1" ? "63" : entry["sqd1"] === "2" ? "62" : entry["sqd1"] === "3" ? "61" : entry["sqd1"] === "4" ? "60" : "59"
            },
            {
              "questionId": 19,
              "optionId": entry["sqd2"] === "0" ? "64" : entry["sqd2"] === "1" ? "63" : entry["sqd2"] === "2" ? "62" : entry["sqd2"] === "3" ? "61" : entry["sqd2"] === "4" ? "60" : "59"
            },
            {
              "questionId": 20,
              "optionId": entry["sqd3"] === "0" ? "64" : entry["sqd3"] === "1" ? "63" : entry["sqd3"] === "2" ? "62" : entry["sqd3"] === "3" ? "61" : entry["sqd3"] === "4" ? "60" : "59"
            },
            {
              "questionId": 21,
              "optionId": entry["sqd4"] === "0" ? "64" : entry["sqd4"] === "1" ? "63" : entry["sqd4"] === "2" ? "62" : entry["sqd4"] === "3" ? "61" : entry["sqd4"] === "4" ? "60" : "59"
            },
            {
              "questionId": 22,
              "optionId": entry["sqd5"] === "0" ? "64" : entry["sqd5"] === "1" ? "63" : entry["sqd5"] === "2" ? "62" : entry["sqd5"] === "3" ? "61" : entry["sqd5"] === "4" ? "60" : "59"
            },
            {
              "questionId": 23,
              "optionId": entry["sqd6"] === "0" ? "64" : entry["sqd6"] === "1" ? "63" : entry["sqd6"] === "2" ? "62" : entry["sqd6"] === "3" ? "61" : entry["sqd6"] === "4" ? "60" : "59"
            },
            {
              "questionId": 24,
              "optionId": entry["sqd7"] === "0" ? "64" : entry["sqd7"] === "1" ? "63" : entry["sqd7"] === "2" ? "62" : entry["sqd7"] === "3" ? "61" : entry["sqd7"] === "4" ? "60" : "59"
            },
            {
              "questionId": 25,
              "optionId": entry["sqd8"] === "0" ? "64" : entry["sqd8"] === "1" ? "63" : entry["sqd8"] === "2" ? "62" : entry["sqd8"] === "3" ? "61" : entry["sqd8"] === "4" ? "60" : "59"
            },
            {
              "questionId": 26,
              "optionId": "",
              "freeText": entry["comments_suggestion"]
            },
            {
              "questionId": 27,
              "optionId": "",
              "freeText": entry["commendation"]
            }
          ]
        }))
      };

      // console.log(transformedData);
      this.setState({ jsonData: transformedData.reponseExcelArray, dataCountUpload: transformedData.reponseExcelArray.length });
    };
    reader.readAsArrayBuffer(file);
  }

  handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      this.setState({ dragActive: true });
    } else if (e.type === "dragleave") {
      this.setState({ dragActive: false });
    }
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragActive: false });
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      this.handleFile(e, e.dataTransfer.files, "drag"); // calling handleFile from within the class
    }
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      this.handleFile(e, e.target.files, "upload"); // calling handleFile from within the class
    }
  }

  onButtonClick() {
    this.inputRef.current.click();
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, inputFileValue: '', dataCountUpload: 0, successSave: [], errorSave: [], });
  };


  handleClickExcel = async () => {
    this.setState({ success: false, loading: true });
    const samplejson2 = this.state.failedFileUpload

    // Convert the JSON data to a worksheet
    const ws = XLSX.utils.json_to_sheet(samplejson2);

    // Create a new workbook and add the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    try {
      await XLSX.writeFile(wb, 'failedResponses.xlsx', { cellStyles: true });
      this.setState({ opensnack: true, snackMessage: "File downloaded successfully!",severityColor: "success" });
      // console.log("File downloaded successfully!");
    } catch (err) {
      
      this.setState({ severityColor: "error" });
      console.error("Error occurred while downloading the file:", err);
    } finally {
      this.setState({ loading: false }); // Reset loading state
    }
  }

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ opensnack: false });
  }

  render() {
    const { loading, success } = this.state;
    const buttonSx = {
      ...(success && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
    };

    return (
      <div className="page">

        <Typography variant="h5" component="div">
          Response Uploader
        </Typography>
        <DragDropFile
          handleDrag={this.handleDrag}
          handleFile={this.handleFile}
          handleDrop={this.handleDrop}
          handleChange={this.handleChange}
          onButtonClick={this.onButtonClick}
          inputRef={this.inputRef}
          dragActive={this.state.dragActive}
        />

        <div style={{ width: "50%" }}>
          <Grid container spacing={2} direction="row" justifyContent="space-around" alignItems="center">
            {this.state.dataCountUpload > 0 ? (
              <><Grid item xs={9}>
                <b>Count of successful responses validated in the system : </b> {this.state.dataCountUpload}
              </Grid><Grid item xs={3}>
                  <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                      variant="contained"
                      sx={buttonSx}
                      disabled={loading}
                      onClick={this.handleSave}
                    >
                      Upload
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-65px',
                        }} />
                    )}
                  </Box>
                </Grid></>
            ) : ""}
            {this.state.failedFileUpload.length > 0 ? (
              <>
                <Grid item xs={9}>
                  <b>Count of failed responses validated in the system : </b> {this.state.failedFileUpload.length}
                </Grid>
                <Grid item xs={3}>
                  <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                      variant="contained"
                      sx={buttonSx}
                      disabled={loading}
                      onClick={this.handleClickExcel}
                    >
                      Download

                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-60px',
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </>
            ) : ""}
          </Grid>


        </div>

        <Dialog
          handleClose={this.handleClose}
          // open={true}
          maxWidth="md"
          headertitle="Response Uploading Details"
          open={this.state.open}
        >


          <Grid container spacing={2} direction="row" justifyContent="space-around" alignItems="flex-end">
            <Grid item xs={9}>
              <b>Uploaded Successfully</b>
            </Grid>
            <Grid item xs={3}>
              {this.state.successSave.length}
            </Grid>
          </Grid>



        </Dialog>
        {/* <Snackbar
          open={this.state.opensnack}
          autoHideDuration={4000}
          onClose={this.handleCloseSnack}
          message={this.state.snackMessage}
          // action={action}
        /> */}

      <Snackbar open={this.state.opensnack} autoHideDuration={4000} onClose={this.handleCloseSnack}>
        <Alert
          onClose={this.handleCloseSnack}
          severity={this.state.severityColor}
          variant="filled"
          sx={{ width: '100%' }}
        >
         {this.state.snackMessage}
        </Alert>
      </Snackbar>
      </div>
    );
  }
}

export default responseUploader;
