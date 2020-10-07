import $ from "jquery";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Route, Switch, useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import React, {useEffect} from "react";
import Register from "../register";
import {makeStyles} from "@material-ui/core/styles";
import API from "../../utils/API";
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

export default function Login(){
    let history = useHistory();
    const [uId, setUId] = React.useState(localStorage.getItem("userId"));
    const [email, setEmail] = React.useState(localStorage.getItem("userEmail"));
    const [category, setCategory] = React.useState(localStorage.getItem("userCategory"));

    const [password, setPassword] = React.useState(
        localStorage.getItem("password")
    );
    const [checkedRemember, setChecked] = React.useState(
        JSON.parse(localStorage.getItem("checked"))
    );
    const classes = useStyles();

    // async function fetchUserId() {
    //     const fullResponse = await fetch(
    //         "/get_user_id_by_email?e_mail=" + email);
    //     const responseJson = await fullResponse.json();
    //     setUId(responseJson);
    // }
    // async function fetchUserCategory() {
    //     const fullResponse = await fetch(
    //         "/get_user?id=" + uId);
    //     const responseJson = await fullResponse.json();
    //     setCategory(responseJson.category);
    // }

    const onChangeEmailHandler = (e) => setEmail(e.target.value);
    const onChangePasswordHandler = (e) => setPassword(e.target.value);
    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
    };
    const onSuccess = () => {
        API.getUserByEmail(email)
            .then(res => {
                setUId(res.json());
            })
            .catch(err => console.log(err));
        API.getUser(uId)
            .then(res => {
                setCategory(res.json().category);
            })
            .catch(err =>console.log(err));
        localStorage.setItem("userId", uId);
        localStorage.setItem("userCategory",category);
        history.push("/");
        if (checkedRemember) {
            localStorage.setItem("password", password);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("checked", "true");
        } else {
            localStorage.setItem("password", "");
            localStorage.setItem("userEmail", "");
            localStorage.setItem("checked", "false");
        }
    };

    const onFailure = error => {
        console.log(error && error.response);
        this.setState({errors: error.response.data, isLoading: false});
    };
    function submitHandler(e) {
        e.preventDefault();
        var data = {
            emailAddress: email,
            password: password
        };
        API.loginUser(data)
            .then(onSuccess)
            .catch(onFailure);
    }
    function redirectRegister(e) {
        history.push("/register");
    }
   function redirectForgotPassword(e){
        history.push("forgot_password");
   }
    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={12} sm={8} md={5} elevation={8} square>
                                <div className={classes.paper}>
                                    <br/>
                                    <br/>
                                    <Avatar className={classes.avatar}>
                                        <LockOutlinedIcon/>
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Login
                                    </Typography>
                                    <form
                                        className={classes.form}
                                        onSubmit={submitHandler}
                                        noValidate
                                    >
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={onChangeEmailHandler}
                                            autoFocus
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={password}
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={onChangePasswordHandler}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="remember"
                                                    checked={checkedRemember}
                                                    onChange={handleCheckChange}
                                                    color="primary"
                                                />
                                            }
                                            label="Remember me"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            className={classes.submit}
                                        >
                                            Login
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link onClick={redirectForgotPassword}>{"Forgot password?"}</Link>
                                            </Grid>
                                            <Grid item>
                                                <Link onClick={redirectRegister}>
                                                    {"Don't have an account? Register"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </div>
                </Grid>
            </Grid>
        </div>
    );
}
