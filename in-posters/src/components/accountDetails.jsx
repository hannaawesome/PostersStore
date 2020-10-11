import React from "react";

import {makeStyles, withStyles} from "@material-ui/core/styles";

import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Dropdown} from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ButtonUp from "@material-ui/core/Button";
import FullHeartIcon from "@material-ui/icons/Favorite";
import BorderHeartIcon from "@material-ui/icons/FavoriteBorder";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: "80.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
export default function AccountDetails() {

    // constructor() {
    //     super();
    //     this.state = {
    //         user: {},
    //     };
    //     this.EditUserItemHandler = this.EditUserItemHandler.bind(this);
    // }
    const [user,setUser] = React.useState({});


    React.useEffect(() => {  async function fetchUser() {const fullResponse = await fetch(
        "/get_user?email="+sessionStorage.getItem("userEmail")
    );
        const responseJson = await fullResponse.json();
        setUser(responseJson)}
        fetchUser().then(r => {
            console.log("got user");
        })}, []);
    const classes = useStyles();
    let history = useHistory();

    const EditUserItemHandler=(e)=>{
        e.preventDefault();
        history.push("/user_edit");
    };
        return (
            <Card className={classes.cardStl}>
                <CardHeader className={classes.headerStl}
                            title={user.fullName}
                            subheader={user.e_mail}
                />
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="Edit"
                        onClick={EditUserItemHandler}
                    >
                        <EditIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        );

}
