import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from '@mui/material'

class reportTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragActive: false
        };
    }



    render() {
        const { items, tableHeader, title, handleClickExcel } = this.props
        
        return (
            <>
                <br />
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {title}
                            </Typography>
                            {items.length > 0 ? (  <Button variant='contained' color='success' onClick={handleClickExcel}>Download EXCEL</Button>):""}
                        </Toolbar>
                    </AppBar>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {tableHeader.map((header) => (
                                    <TableCell align="center"><strong>{header}</strong></TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {/* {error && <div>Error: {error}</div>} */}
                            {items.length > 0 ? (
                                <>
                                    {items.map((item) => (
                                        <TableRow key={item.id}>
                                            {/* console.log("Condition:", key !== 'grand total'); */}
                                            {Object.keys(item).map((key) => ( // Assuming each item is an object
                                                key !== 'grandTotal' && key !== 'optionID' &&// Exclude "grand total" key
                                                <TableCell key={key} align="center">
                                                    {item[key]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell  align="center">
                                        <b>No data available</b>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>


            </>
        );
    }
}

export default reportTable;