
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import {
    FormGroup,
    FormControl,
    FormLabel,

} from "react-bootstrap";
import "../../components/css/ForgotPassword.css";
import makeToast from "../../Toaster";
import LoaderButton from "../../components/LoaderButton";
import FormStaticText from "tabler-react/dist/components/Form/FormStaticText.react";

export default function ForgotPassword() {
    const [code, setCode] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);

    function validateCodeForm() {
        return email.length > 0;
    }

    function validateResetForm() {
        return (
            code.length > 0 &&
            password.length > 0 &&
            password === confirmPassword
        );
    }

    async function handleSendCodeClick(event) {
        event.preventDefault();

        setIsSendingCode(true);

        try {
            await Auth.forgotPassword(email);
            setCodeSent(true);
        } catch (error) {
            //onError(error);
            makeToast(error);
            setIsSendingCode(false);
        }
    }

    async function handleConfirmClick(event) {
        event.preventDefault();

        setIsConfirming(true);

        try {
            await Auth.forgotPasswordSubmit(
                email,
                code,
                password
            );
            setConfirmed(true);
        } catch (error) {
            makeToast(error);
            setIsConfirming(false);
        }
    }

    function renderRequestCodeForm() {
        return (
            <form onSubmit={handleSendCodeClick}>
                <FormGroup bsSize="large" controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isSendingCode}
                    disabled={!validateCodeForm()}
                >
                    Send Confirmation
                </LoaderButton>
            </form>
        );
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmClick}>
                <FormGroup bsSize="large" controlId="code">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                    <FormStaticText>
                        Please check your email ({email}) for the confirmation code.
                    </FormStaticText>
                </FormGroup>
                <hr />
                <FormGroup bsSize="large" controlId="password">
                    <FormLabel>New Password</FormLabel>
                    <FormControl
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup bsSize="large" controlId="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isConfirming}
                    disabled={!validateResetForm()}
                >
                    Confirm
                </LoaderButton>
            </form>
        );
    }

    function renderSuccessMessage() {
        return (
            <div className="success">
                {/*<Glyphicon glyph="ok" />*/}
                <p>Your password has been reset.</p>
                <p>
                    <Link to="/log_in">
                        Click here to login with your new credentials.
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div className="ForgotPassword">
            {!codeSent
                ? renderRequestCodeForm()
                : !confirmed
                    ? renderConfirmationForm()
                    : renderSuccessMessage()}
        </div>
    );
}
// import React, { useState, useEffect } from "react";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
// import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import FormFormControl from "@material-ui/core/FormFormControl";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import { Route, Switch } from "react-router-dom";
// import $ from "jquery";
// import { useHistory } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: "100vw",
//         height: "100vh",
//     },
//     image: {
//         backgroundImage: "url(https://source.unsplash.com/random/?phone)",
//         backgroundRepeat: "no-repeat",
//         backgroundColor:
//             theme.palette.type === "light"
//                 ? theme.palette.grey[50]
//                 : theme.palette.grey[900],
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//     },
//     paper: {
//         margin: theme.spacing(8, 4),
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: "100%", // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

// export default function ForgotPassword() {
//     const classes = useStyles();
//     let history = useHistory();
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");
//     const onChangeEmailHandler = (e) => setEmail(e.target.value);
//     const onChangePasswordHandler = (e) => setPassword(e.target.value);

    // function onSubmitRegisterHandler(e) {
    //     e.preventDefault();
    //
    //     var data = {
    //         e_mail: email
    //     };
    //     // Submit form via jQuery/AJAX
    //     $.ajax({
    //         type: "POST",
    //         url: "/forgot_password",
    //         data: data,
    //     })
    //         .done(function (data) {
    //             localStorage.setItem("userEmail", email);
    //             history.push("/");
    //         })
    //         .fail(function (jqXhr) {
    //             alert("Try again!!");
    //         });
    // }

