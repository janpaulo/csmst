import * as React from 'react';
import {
    TextField,
    Grid,
    Button,
    Paper,
    Autocomplete,
    Typography
} from '@mui/material'

class searchForm extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
        };
    }
    render() {
        const { title, searchItem, handleInputChange, selectedOption, handleAutocomplete, handleSubmit, offices, proOffices, selectedOffice, handleAutocompleteProcode, clearData } = this.props

        return (
            <>
                <Paper elevation={3} style={{ padding: 30 }}>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Grid container spacing={2} direction="row" justifyContent="space-around"  alignItems="flex-end">
                        <Grid item xs={3}>

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                size="small"
                                options={offices}
                                value={selectedOffice}
                                name="office"
                                getOptionLabel={(option) => option.officeName}
                                getOptionSelected={(option, value) => option.officeName === value.officeName && option.phicCode === value.phicCode} // Custom comparison logic
                                onChange={(e, newValue) => handleAutocomplete(e, newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        label="Offices"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3}>

                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                size="small"
                                options={proOffices}
                                value={selectedOption}
                                name="procode"
                                getOptionLabel={(option) => option.officeName}
                                getOptionSelected={(option, value) => option.officeName === value.officeName && option.phicCode === value.phicCode} // Custom comparison logic
                                onChange={(e, newValue) => handleAutocompleteProcode(e, newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        label="Pro Office"
                                    />
                                )}
                            />


                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Start Date"
                                required
                                type="date"
                                fullWidth
                                value={searchItem.startDate}
                                onChange={(e) => handleInputChange(e)}
                                InputLabelProps={{ shrink: true, required: true }}
                                name="startDate"
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="End Date"
                                required
                                fullWidth
                                type="date"
                                value={searchItem.endDate}
                                onChange={(e) => handleInputChange(e)}
                                InputLabelProps={{ shrink: true, required: true }}
                                name="endDate"
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <Grid container spacing={2}
                                direction="row"
                                justifyContent="space-around"
                                alignItems="flex-end">
                                <Button
                                    variant='outlined'
                                    onClick={(e) => handleSubmit(e)}
                                >Generate</Button>

                                <Button
                                    variant='outlined'
                                    onClick={(e) => clearData(e)}
                                >Clear</Button>
                            </Grid>

                        </Grid>



                    </Grid>
                </Paper>
            </>
        );
    }


}


export default searchForm;