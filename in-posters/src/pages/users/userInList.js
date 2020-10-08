import {useHistory} from "react-router-dom";
import $ from "jquery";
import {useContext} from "react";
import {CartContext} from "../../contexts/CartContext";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import EditIcon from "@material-ui/icons/Edit";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

var React = require('react');
const useStyles = makeStyles((theme) => ({
    cardStl : {
        backgroundColor: '#fafafa',
        width: '30%',
        height: '20%',
        overflow: 'hidden',
        boxShadow: '.25px .25px 5px .25px',
        borderRadius: '2px 2px 2px 2px',
        zIndex: 5
    },

 headerStl : {
    backgroundColor: '#901111', // red
    padding: '1%',
    color: '#eceff1',
    position: 'relative'
},

 contentStl :{
    color: 'rgb(0, 0, 0, 0.54)',
    padding: '2%'
}
}));

export default function UserInList({ user }) {
    let history = useHistory();
    const classes = useStyles();


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
}