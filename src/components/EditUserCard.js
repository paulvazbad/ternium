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

import edit from "./images/edit"

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
        editar: false,
        };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ editar: !state.editar }));
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
                                value={this.props.nombre}
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                            />
                        </TableCell>
                        <TableCell align="left">
                            <TextField
                                id="id"
                                label="ID"
                                className={classes.textField}
                                value={this.props.id}
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                            />
                        </TableCell>
                        <div align="right">
                            <Button variant="contained" color="primary" style={buttonStyle1}>
                                {edit()}
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
                                    readOnly: true,
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
                                    readOnly: true,
                                }}
                            >
                                {areas.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </TableCell>
                        <TableCell align="left" colspan={2}>
                            <TextField
                                id="puesto"
                                label="Puesto"
                                className={classes.textField}
                                value={this.props.puesto}
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
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