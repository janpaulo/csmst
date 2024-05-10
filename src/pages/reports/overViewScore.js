import * as React from 'react';
import SearchForm from './searchForm'
import ReportTable from '../sharedFile/reportTable'
import axios from 'axios'
import * as XLSX from 'xlsx';

class overViewScore extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Client Age Profile (Demographic)",
      items: [],
      tableHeader: ['Age', 'Total Client', 'Overall'],
      selectedProcode: null,
      searchItem: { procode: "", officeId: "", startDate: "", endDate: "" },
      isItemsIsNull: false,
    };
  }

  handleAutocomplete = (e, newValue) => {
    console.log(newValue)
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

  handleGenerate = (e) => {
    var item = this.state.searchItem
    item.officeId = "0206"
    item.procode = ""

    // Parse the input date string and create a new Date object
    const parsedstartDate = new Date(Date.parse(item.startDate));
    // Format the date using toLocaleDateString() with options for mm/dd/yyyy format
    const formattedStartDate = parsedstartDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const parsedEndDate = new Date(Date.parse(item.endDate));
    // Format the date using toLocaleDateString() with options for mm/dd/yyyy format
    const formattedEndDate = parsedEndDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    item.startDate = formattedStartDate
    item.endDate = formattedEndDate

    console.log(item);

    axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL + "GetClientAgeList",
      data: (item),
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      this.setState({ items: JSON.parse(resp.data.result), isItemsIsNull: true })
      console.log(JSON.parse(resp.data.result))
    })


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
    XLSX.writeFile(wb, 'AgeProfilereport.xlsx', {cellStyles:true}, (err) => {
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
          selectedOption={this.state.selectedProcode}
          handleInputChange={this.handleInputChange}
          handleAutocomplete={this.handleAutocomplete}
          handleSubmit={this.handleGenerate}
        />

        {this.state.isItemsIsNull ?
          <ReportTable
            handleClickExcel={this.handleClickExcel}
            isItemsIsNull={this.state.isItemsIsNull}
            title={this.state.title}
            items={this.state.items}
            tableHeader={this.state.tableHeader}
          />
          : ""}


      </>
    )
  }

}


export default overViewScore;