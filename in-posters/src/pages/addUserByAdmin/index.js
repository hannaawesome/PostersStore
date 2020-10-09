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
import { Route, Switch } from "react-router-dom";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import API from '../../utils/API';
import HomePage from "../home";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const styles = (theme) => ({
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
});

const initialState = {
    fName: '',
    lName: '',
    email: '',
    category: 'Customer',
    password: '',
};
class RegisterByAdmin extends Component {
    state = initialState;
    constructor() {
        super();
        this.onChangeEmailHandler = this.onChangeEmailHandler.bind(this);
        this.onChangePasswordHandler  = this.onChangePasswordHandler.bind(this);
        this.onChangeCategoryHandler =  this.onChangeCategoryHandler.bind(this);
        this.onChangeFName =  this.onChangeFName.bind(this);
        this.onChangeLName = this.onChangeLName.bind(this);
        this.onSubmitRegisterHandler=this.onSubmitRegisterHandler.bind(this);
    }
    componentDidMount() {
    }
    //const [uId, setUId] = React.useState("");
    //const [fName, setFName] = React.useState("");
    // const [lName, setLName] = React.useState("");
    //const [email, setEmail] = React.useState("");
    //const [category, setCategory] = React.useState("");
    // const [password, setPassword] = React.useState("");

    onChangeEmailHandler = email => {
        this.setState({email:email.target.value});
    };
    onChangePasswordHandler  = password => {
        this.setState({password:password.target.value});
    };
    onChangeCategoryHandler = (e) => {this.setState({category: e.target.value}); localStorage.setItem("userCategory",this.state.category);};

    onChangeFName = (e) => this.setState({fName: e.target.value});
    onChangeLName = (e) => this.setState({lName: e.target.value});

    // async function fetchUserId() {
    //     const fullResponse = await fetch(
    //         "/get_user_id_by_email?e_mail=" + email);
    //     const responseJson = await fullResponse.json();
    //     setUId(responseJson);
    // }
    onSubmitRegisterHandler(e){
        e.preventDefault();
        const { history } = this.props;

        const {fName, lName, email, category, password} = this.state;
        var data = {
            e_mail: email,
            password: password,
            fullName: {
                fName: fName,
                lName: lName
            },
            category:category
        };

        // API.addUser(data)
        //     .then(res => {
        //         API.getUserByEmail(email)
        //             .then(res => {
        //                 console.log("success");
        //                 sessionStorage.setItem("userCategory", category);
        //                 sessionStorage.setItem("userEmail", res.data.e_mail);
        //                 history.push("/");
        //              })
        //             .catch(err => console.log(err));
        //     })
        //     .catch(err => console.log(err));

    }

    redirectLogin(e) {
        //e.preventDefault();
        const { history } = this.props;
        history.push("/log_in", { from: 'anywhere' } );
    }

    render() {
        const {classes} = this.props;
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
                                autoComplete="fName"
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
                                autoComplete="lName"
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
                <Grid item xs={12}>
                <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-native-required">Role</InputLabel>
                <Select
                native
                value={this.state.category}
                onChange={this.onChangeCategoryHandler}
                inputProps={{
                    id: 'age-native-required',
                }}
                >
                <option aria-label="None" value="" />
                <option value={"Admin"}>Admin</option>
                <option value={"Employee"}>Employee</option>
                <option value={"Customer"}>Customer</option>
                </Select>
                </FormControl>
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
export default withStyles(styles, { withTheme: true })(RegisterByAdmin);




