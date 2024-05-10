import * as React from 'react';
import SearchForm from './searchForm'
import ReportTable from '../sharedFile/reportTable'
import axios from 'axios'
import * as XLSX from 'xlsx';

class sqdSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "SQD Summary Rating",
      items: [],
      tableHeader: ['SQD', 'Strongly Agree', 'Agree', ' Neither Agree nor Disagree', 'Disagree', 'Strongly Disagree', 'N/A', 'Total Responses', 'Overall'],
      selectedProcode: null,
      searchItem: { procode: "", officeId: "", startDate: "", endDate: "" },
      isItemsIsNull: false,
      offices: [],
      proOffices: [],
      selectedOffice:null
    };
  }


  componentDidMount() {
    this.handleOffices("");
    if (window.location.pathname !== '/sqd_1_8_summary') {
      this.setState({ title: "SQD 0 Summary Rating" })
    } else {
      this.setState({ title: "SQD 1 - 8 Summary Rating" })
    }
  }


  handleOffices = (url) => {
    axios({
      method: "GET",
      url: process.env.REACT_APP_API_URL + "GetOfficesList/" + url,
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      this.setState({ offices: JSON.parse(resp.data.result) })
      // console.log(JSON.parse(resp.data.result))
    })
  }

  handleProOffices = (url) => {
    url === "" ? this.setState({ selectedProcode: null, proOffices: [] }) :
      axios({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "GetOfficesList/" + url,
        headers: { 'Content-Type': 'application/json' }
      }).then(resp => {
        this.setState({ proOffices: JSON.parse(resp.data.result) })
      })
  }


  handleAutocomplete = (e, newValue) => {
    this.setState({ selectedOffice: newValue });
    this.handleProOffices(newValue !== null ? newValue.phicCode : "")

  }

  handleAutocompleteProcode = (e, newValue) => {
    this.setState({ selectedProcode: newValue });

  }


  handleInputChange = (e) => {

    this.setState({
      searchItem: {
        ...this.state.searchItem,
        [e.target.name]: e.target.value,
      },
    });

  }

  clearData = () => {
    this.setState({selectedOffice :null, selectedProcode: null, searchItem:  {...this.state.searchItem, 
      startDate: "",endDate: "" }, items: [],isItemsIsNull: false, proOffices:[]})
  }

  reloadPage = () => { 
    window.location.reload(); 
  }

  handleGenerate = (e) => {

    var item = this.state.searchItem
    item.officeId = this.state.selectedProcode !== null ? this.state.selectedProcode.phicCode : ""
    item.procode = ""
    
    // Parse the input date string and create a new Date object
    const parsedstartDate = new Date(Date.parse(item.startDate));
    // Format the date using toLocaleDateString() with options for mm/dd/yyyy format
    const formattedStartDate = parsedstartDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const parsedEndDate = new Date(Date.parse(item.endDate));
    // Format the date using toLocaleDateString() with options for mm/dd/yyyy format
    const formattedEndDate = parsedEndDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });


    var newObject = {}
    newObject.procode = ""
    newObject.officeId = this.state.selectedProcode !== null ? this.state.selectedProcode.phicCode : ""
    newObject.startDate = formattedStartDate
    newObject.endDate = formattedEndDate


    axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL + "GetSQDReports",
      data: (newObject),
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {

      var result = []
      if (resp.data.success) {
        var dataNew = JSON.parse(resp.data.result)
        if (window.location.pathname === '/sqd_1_8_summary') {
          result = dataNew.filter((x) => x.sqdName !== "SQD0");

          const roundedData = result.map((item) => ({
            ...item,
            overAll: parseFloat(item.overAll) !== item.overAll // Check for non-numeric values
              ? this.roundUpToTwoDecimals(parseFloat(item.overAll.replace(/[-E]/g, '')))
              : item.overAll, // Keep original value if already a number
          }));
        
          this.setState({ items: roundedData, isItemsIsNull: true })
        } else {
          result = dataNew.filter((x) => x.sqdName === "SQD0");
            const roundedData = result.map((item) => ({
            ...item,
            overAll: parseFloat(item.overAll) !== item.overAll // Check for non-numeric values
              ? this.roundUpToTwoDecimals(parseFloat(item.overAll.replace(/[-E]/g, '')))
              : item.overAll, // Keep original value if already a number
          }));
        
          this.setState({ items: roundedData, isItemsIsNull: true })
        }


      }else{
        this.setState({ items: [], isItemsIsNull: true })
      }
    })


  }

  roundUpToTwoDecimals = (number) => {
    return Math.ceil(number * 100) / 100;
  }

  handleClickExcel = () => {
    const samplejson2 = this.state.items
    console.log(samplejson2)
    // Convert the JSON data to a worksheet
    const ws = XLSX.utils.json_to_sheet(samplejson2);

    // Create a new workbook and add the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate a download link for the workbook 
    XLSX.writeFile(wb, 'AgeProfilereport.xlsx', { cellStyles: true }, (err) => {
      if (!err) {
        console.log("File downloaded successfully!");
        // You can add further actions or display a message here
      } else {
        console.error("Error occurred while downloading the file:", err);
        // Handle error accordingly
      }
    });
  }



  render() {
    return (
      <>
        <SearchForm
          searchItem={this.state.searchItem}
          title={this.state.title}

          selectedOffice={this.state.selectedOffice}
          selectedOption={this.state.selectedProcode}
          proOffices={this.state.proOffices}
          offices={this.state.offices}
          handleAutocompleteProcode={this.handleAutocompleteProcode}

          handleInputChange={this.handleInputChange}
          handleAutocomplete={this.handleAutocomplete}
          handleSubmit={this.handleGenerate}
          clearData={this.clearData}

        />


        {this.state.isItemsIsNull ?
          <ReportTable
            handleClickExcel={this.handleClickExcel}
            isItemsIsNull={this.state.isItemsIsNull}
            title={this.props.titles}
            items={this.state.items}
            tableHeader={this.state.tableHeader}

          />
          : ""}


      </>
    )
  }

}


export default sqdSummary;