import React, { useContext } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const AccountDetails = () => {
    const classes = useStyles();

        let history = useHistory();
    const [user, userSet] = React.useState({});
    React.useEffect(() => {
        async function fetchUser() {
            const fullResponse = await fetch(
                "/get_user?email="+sessionStorage.getItem("userEmail")
            );
            const responseJson = await fullResponse.json();
            userSet(responseJson);
        }

        fetchUser().then(r => console.log("got"));
    }, []);
    function ViewUserItemHandler(e) {
        //var self;
        e.preventDefault();
        history.push("/user_edit");
    }
    return (
        <Card className={classes.cardStl}>
            <CardHeader className={classes.headerStl}
                        title={user.fullName.fName+' '+user.fullName.lName}
                        subheader={user.e_mail}
            />
            <CardActions disableSpacing>
                <IconButton
                    aria-label="Edit"
                    onClick={ViewUserItemHandler}
                >
                    <EditIcon/>
                </IconButton>

            </CardActions>
        </Card>
    );
};

export default AccountDetails;
