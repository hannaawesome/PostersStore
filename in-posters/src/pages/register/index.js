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
//let history = useHistory();
// const initialState = {
//     uId: '',
//     fName: '',
//     lName: '',
//     email: '',
//     category: 'Customer',
//     password: '',
// };
const Register= (props) => {
    let history = useHistory();
    const classes = useStyles();

    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onChangeEmailHandler  = email => {
        setEmail(email.target.value);
    };
   const onChangePasswordHandler = (e) => setPassword( e.target.value);
    const onChangeFName = (e) => setFName( e.target.value);
    const onChangeLName = (e) => setLName( e.target.value);

    // async function fetchUserId() {
    //     const fullResponse = await fetch(
    //         "/get_user_id_by_email?e_mail=" + email);
    //     const responseJson = await fullResponse.json();
    //     setUId(responseJson);
    // }
    const onSuccess = () => {
        console.log(email);
        $.ajax({
            type: "GET",
            url: "/get_user?email="+email,
        })
            .done(res => {
                setCategory( res.category);
                sessionStorage.setItem("userCategory", category);
                sessionStorage.setItem("userEmail",email);
                props.setupSocket();
                history.push("/");
            })
            .fail(err => console.log(err));

        // makeToast("error", err.response.data.message);

    };
    const onFailure = error => {
        makeToast("register failed", error.response.data.message);
    };
    const onSubmitRegisterHandler= (e) => {
        e.preventDefault();

        var data = {
            e_mail: email,
            password: password,
            fullName: {
                fName: fName,
                lName: lName
            }};

        // Submit form via jQuery/AJAX
        $.ajax({
            type: "POST",
            url: "/register",
            data: data,
        })
            .done(onSuccess)
            .fail(onFailure);
    };


    function redirectLogin(e) {
        //e.preventDefault();
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
                                autoComplete="fName"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={onChangeFName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lName"
                                onChange={onChangeLName}
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


