import React, {useState, useEffect, Component} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Route, Switch, withRouter} from "react-router-dom";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import HomePage from "../home";
import makeToast from "../../Toaster";
import {sha256} from "js-sha256";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random/?phone)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register= (props) => {
    let history = useHistory();
    const classes = useStyles();

    const [fullName, setFullName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address,setAddress]=React.useState("");
    const [email, setEmail] = React.useState("");

    const [password, setPassword] = React.useState("");
    const onChangeEmailHandler  = email => {
        setEmail(email.target.value);
    };
    const onChangePasswordHandler = (e) => setPassword( e.target.value);
    const onChangeName = (e) => setFullName( e.target.value);
    const onChangePhone = (e) => setPhone( e.target.value);
    const onChangeAddress = (e) => setAddress( e.target.value);

    const onSuccess = () => {
                sessionStorage.setItem("userCategory", "Customer");
                sessionStorage.setItem("userEmail",email);
                localStorage.setItem("connectedByGoogle","false");
                props.setupSocket();
                history.push("/");
    };
    const onFailure = error => {
        makeToast("error", error.response.data.message);
    };
    const onSubmitRegisterHandler= (e) => {
        e.preventDefault();

        var data = {
            e_mail: email,
            password: sha256(password+process.env.SALT_PASSWORD),
            fullName: fullName,
            phone:phone,
            address:address
        };

        // Submit form via jQuery/AJAX
        $.ajax({
            type: "POST",
            url: "/register",
            data: data,
        }).then(onSuccess)
            .catch(onFailure);
    };


    function redirectLogin(e) {
        history.push("/log_in", { from: 'anywhere' } );
    }
        return (
            <div className={classes.paper}>
                <br/>
                <br/>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>

                <form
                    className={classes.form}
                    onSubmit={onSubmitRegisterHandler}
                    noValidate
                >
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>

                            <TextField
                                autoComplete="fullName"
                                name="fullName"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Name"
                                autoFocus
                                onChange={onChangeName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={onChangeEmailHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={onChangePasswordHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                type="number"
                                autoComplete="phone"
                                onChange={onChangePhone}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                autoComplete="address"
                                onChange={onChangeAddress}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}>
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={redirectLogin} variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
};
export default withRouter(Register);


