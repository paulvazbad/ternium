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
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";

import save from "./images/save"

const styles = theme => ({
    root: {
        marginTop: "0%",
        overflowX: 'auto',
    },
});

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
        enableSave: false,
        showPassword: false,

        nombre: this.props.nombre,
        lugar: this.props.lugar,
        area: this.props.area,
        puesto: this.props.puesto,
        username: this.props.username,
        userpassword: this.props.userpassword,

        formInfo: null,
    };

    handleSave = () => {
        const forminfo = {
            formNombre: this.state.nombre,
            formLugar: this.state.lugar,
            formArea: this.state.area,
            puesto: this.state.puesto,
            username: this.state.username,
            userpassword: this.state.userpassword,
        }
        this.setState(state => ({ formInfo: this.forminfo }))
        //this.props.handleSave(this.state.formInfo);
        alert("handleSave function datos")
    };

    handleDelete = () => {
        alert("handleDelete function")
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value })
        this.setState(state => ({ enableSave: true }));
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        const { classes } = this.props;

        var buttonColor = (this.state.enableSave) ? "#FF8000" : "gray"

        var buttonStyle1 = {
            width: "10%",
            marginLeft: "30%",
            marginRight: 10,
            textAlign: "right",
            backgroundColor: buttonColor,
        }

        return (
            <Grid container spacing={24}>
                <Grid item xs={3} align="left">
                                <TextField
                                    id="name"
                                    label="Nombre"
                                    className={classes.textField}
                                    defaultValue={this.props.nombre}
                                    margin="normal"
                                    onChange={this.handleChange('nombre')}
                                />
                </Grid>
                <Grid item xs={3} align="left">
                                <TextField
                                    id="username"
                                    label="Username"
                                    className={classes.textField}
                                    defaultValue={this.props.username}
                                    onChange={this.handleChange('username')}
                                    InputProps={{
                                        //readOnly: true,
                                    }}
                                    margin="normal"
                                />
                            </Grid>
                <Grid item xs={3} align="left">
                    <InputLabel htmlFor="adornment-password" style={{fontSize: "12px"}}>Password</InputLabel>
                                    <Input
                                        id="password"
                                        defaultValue={this.props.userpassword}
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                            </Grid>
                <Grid item xs={3} align="right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!this.state.enableSave}
                                    style={buttonStyle1}
                                    onClick={this.handleSave}      //change
                                >
                                        {save()}
                                </Button>
                            </Grid>
                <Grid item xs={3} align="left">
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
                            </Grid>
                <Grid item xs={3} align="left">
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
                                </Grid>
                    <Grid item xs={3} align="left">
                                <TextField
                                    id="puesto"
                                    label="Puesto"
                                    className={classes.textField}
                                    defaultValue={this.props.puesto}
                                    onChange={this.handleChange('puesto')}
                                    InputProps={{
                                        readOnly: this.state.readOnly,
                                    }}
                                    margin="normal"
                                />
                            </Grid>
                <Grid item xs={3} align="right" onClick={() => { this.handleDelete() }}>
                    <IconButton
                        style={{ marginRight: "7%" }}
                        className={classes.button}
                        aria-label="Delete"
                        fontSize="large"
                    >
                        <DeleteIcon/>
                                </IconButton>
                    </Grid>
                </Grid>
        );
    }
}

userCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(userCard);