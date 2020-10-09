
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FormGroup,
    FormControl,
    FormLabel,

} from "react-bootstrap";
import "../../components/css/ForgotPassword.css";
import makeToast from "../../Toaster";
import LoaderButton from "../../components/LoaderButton";
import $ from "jquery";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

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

    async function handleSendEmailClick(event) {
        event.preventDefault();

        setIsSendingCode(true);

        try {
                  $.ajax({
                        type: "POST",
                        url: "/forgot_password",
                        data: {email:email},
                    })
                        .done()
                        .fail((e)=>console.log(e));

           // await Auth.forgotPassword(email);
            setCodeSent(true);
            makeToast("info","An email has been sent to your address.");

        } catch (error) {
           // onError(error);
            makeToast("error",error);
            setIsSendingCode(false);
        }
    }

    async function handleConfirmClick(event) {
        event.preventDefault();

        setIsConfirming(true);

        try {
            var data={
                code:code,
                e_mail:email,
                password:password
            };
            $.ajax({
                type: "POST",
                url: "/confirm_code",
                data: data,
            })
                .done()
                .fail();

            setConfirmed(true);

        } catch (error) {
            makeToast("error",error);
            setIsConfirming(false);
        }
    }

    function renderRequestCodeForm() {
        return (
            <form onSubmit={handleSendEmailClick}>
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
                    <FormLabel>
                        Please check your email ({email}) for the confirmation code.
                    </FormLabel>
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
var history=useHistory();
    function redirectLogin() {
        history.push('/log_in',{from:"anywhere"});
    }

    function renderSuccessMessage() {
        return (
            <div className="success">
                {/*<Glyphicon glyph="ok" />*/}
                <p>Your password has been reset.</p>
                <p>
                    <Link onClick={redirectLogin}>
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

