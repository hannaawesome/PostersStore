import React from "react";

import {makeStyles, withStyles} from "@material-ui/core/styles";

import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";

import {red} from "@material-ui/core/colors";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PhoneIcon from '@material-ui/icons/Phone';
import PublicIcon from '@material-ui/icons/Public';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import List from "@material-ui/core/List";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    }
}));
export default function AccountDetailsAdmin({user}) {


    const classes = useStyles();
    let history = useHistory();

    const EditUserItemHandler=(e)=>{
        e.preventDefault();
        history.push("/user_edit");
    };
    return (
        <Card>
            <Card.Content>
                <Card.Header>{user.fullName?user.fullName:""}</Card.Header>
                <Card.Meta>{user.category?user.category:""}</Card.Meta>
                <Card.Description>
                     <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MailOutlineIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Email" secondary={user.e_mail?user.e_mail:""} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PhoneIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Phone" secondary={user.phone?user.phone:""} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PublicIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Address" secondary={user.address?user.address:""} />
                        </ListItem>
                    </List>
                </Card.Description>
            </Card.Content>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="Edit"
                    onClick={EditUserItemHandler}>
                    <EditIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );

}
