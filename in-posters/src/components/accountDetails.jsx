import React from "react";

import {makeStyles, withStyles} from "@material-ui/core/styles";

import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";

import {red} from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ListItemText from "@material-ui/core/ListItemText";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },


}));
export default function AccountDetails() {

    const [email,setEmail] = React.useState(sessionStorage.getItem("userEmail"));
    const [phone,setPhone] = React.useState("");
    const [fullName,setFullName] = React.useState("");
    const [address,setAddress] = React.useState("");
    const [category,setCategory] = React.useState(sessionStorage.getItem("userCategory"));

    React.useEffect(() => {  async function fetchUser() {const fullResponse = await fetch(
        "/get_user?email="+sessionStorage.getItem("userEmail")
    );
        const responseJson = await fullResponse.json();
        if(responseJson!==undefined) {
            setPhone(responseJson.phone);
            setFullName(responseJson.fullName);
            setAddress(responseJson.address);
            console.log(phone);

        }

    }
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
            <Card color="pink">
                <Card.Content>
                    <Card.Header>{fullName}</Card.Header>
                    <Card.Meta>{category}</Card.Meta>
                    <Card.Description>
                        <List className={classes.root}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MailOutlineIcon />
                                    </Avatar>
                                </ListItemAvatar>
                               <Typography>{email}</Typography>}
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PhoneIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <Typography>{phone}</Typography> />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PublicIcon />
                                    </Avatar>
                                </ListItemAvatar>
                               <Typography>{address}</Typography>
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
