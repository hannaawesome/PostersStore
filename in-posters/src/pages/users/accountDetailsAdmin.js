import React from "react";

import {makeStyles, withStyles} from "@material-ui/core/styles";

import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";

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
export default function AccountDetailsAdmin({user}) {


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
