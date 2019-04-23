import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import save from "./images/save"

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: "0%",
        overflowX: 'auto',
    },
    table: {
        width: "100%",
        //fontSize: '200%',
    },
});

var buttonStyle1 = {
    width: "10%",
    marginLeft: "30%",
    marginRight: 10,
    textAlign: "right",
    backgroundColor: "#FF8000",
}

const areas = [
    {
        value: 'Aceria',
        label: 'Aceria',
    },
    {
        value: 'REDI',
        label: 'REDI',
    },
    {
        value: 'ALCO',
        label: 'ALCO',
    },
];

const lugares = [
    {
        value: 'Molino Caliente 2',
        label: 'Molino Caliente 2',
    },
    {
        value: 'Patio PEGI',
        label: 'Patio PEGI',
    },
];

class userCard extends React.Component{
    state = {
        nombre: this.props.nombre,
        lugar: this.props.lugar,
        area: this.props.area,
        puesto: this.props.puesto,
        id: this.props.id,
        enableSave: false,
        };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ readOnly: !state.readOnly }));
    };

    editing = () => {
        this.setState(state => ({ enableSave: !state.enableSave }));
    };

    render() {
        //alert(this.props.area)
        const { classes } = this.props;

        return (
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell align="left">
                            <TextField
                                id="name"
                                label="Nombre"
                                className={classes.textField}
                                defaultValue={this.props.nombre}
                                margin="normal"
                                //onBlur={this.editing()}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <TextField
                                id="id"
                                label="ID"
                                className={classes.textField}
                                defaultValue={this.props.id}
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                                margin="normal"
                                //onBlur={this.editing()}
                            />
                        </TableCell>
                        <div align="right">
                            <Button
                                variant="contained"
                                color="primary"
                                style={buttonStyle1}
                                //disabled= "false"
                            >
                                {save()}
                            </Button>
                        </div>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            <TextField
                                select
                                label="Lugar"
                                value={this.state.lugar}
                                onChange={this.handleChange('lugar')}
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            >
                                {lugares.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </TableCell>
                        <TableCell align="left">
                            <TextField
                                select
                                label="Area"
                                value={this.state.area}
                                onChange={this.handleChange('area')}
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                            >
                                {areas.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </TableCell>
                        <TableCell align="left">
                            <TextField
                                id="puesto"
                                label="Puesto"
                                className={classes.textField}
                                defaultValue={this.props.puesto}
                                InputProps={{
                                    readOnly: this.state.readOnly,
                                }}
                                margin="normal"
                                //onBlur={this.editing()}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

userCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(userCard);