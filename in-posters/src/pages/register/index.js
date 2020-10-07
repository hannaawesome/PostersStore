import React, {useState, useEffect, Component} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
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
import { Route, Switch } from "react-router-dom";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import API from '../../utils/API';
import HomePage from "../home";

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
const classes = useStyles();
let history = useHistory();

class Register extends Component {
    state = {
        uId: '',
        fName: '',
        lName: '',
        email: '',
        category: '',
        password: ''
    };

    componentDidMount() {
    }

    //const [uId, setUId] = React.useState("");
    //const [fName, setFName] = React.useState("");
    // const [lName, setLName] = React.useState("");
    //const [email, setEmail] = React.useState("");
    //const [category, setCategory] = React.useState("");
    // const [password, setPassword] = React.useState("");
    onChangeEmailHandler = (e) => this.setState({email: e.target.value});
    onChangePasswordHandler = (e) => this.setState({password: e.target.value});
    onChangeFName = (e) => this.setState({fname: e.target.value});
    onChangeLName = (e) => this.setState({lname: e.target.value});

    // async function fetchUserId() {
    //     const fullResponse = await fetch(
    //         "/get_user_id_by_email?e_mail=" + email);
    //     const responseJson = await fullResponse.json();
    //     setUId(responseJson);
    // }
    onSubmitRegisterHandler(e){
        e.preventDefault();
        const {uId, fName, lName, email, category, password} = this.state;
        var data = {
            e_mail: email,
            password: password,
            fullName: {
                fName: fName,
                lName: lName
            },
        };

        API.registerUser(data)
            .then(res => {
                API.getUserByEmail(email)
                    .then(res => {
                        this.setState({id: res.json()});
                        API.getUser(uId)
                            .then(res => {
                                this.setState({category: res.json().category});
                            })
                            .catch(err => console.log(err));
                        localStorage.setItem("userCategory", category);
                        localStorage.setItem("userId", uId);
                        history.push("/");
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

    }

    redirectLogin(e) {
        //e.preventDefault();
        history.push("/log_in");
    }

    render() {
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
                    onSubmit={this.onSubmitRegisterHandler}
                    noValidate
                >
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>

                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={this.onChangeFName}
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
                                autoComplete="lname"
                                onChange={this.onChangeLName}
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
                                onChange={this.onChangeEmailHandler}
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
                                onChange={this.onChangePasswordHandler}
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
                            <Link onClick={this.redirectLogin} variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}
export default Register;



