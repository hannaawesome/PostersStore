import {useHistory} from "react-router-dom";
import $ from "jquery";
import {useContext} from "react";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
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

export default function OrderListItem({ order }) {
    const classes = useStyles();

    function FinishOrderItemHandler(e) {

    }
    return (
        <Card className={classes.cardStl}>
            <CardHeader className={classes.headerStl}
                        title={order._id}
            />
            <CardActions disableSpacing>
                <IconButton
                    aria-label="Delete"
                    onClick={FinishOrderItemHandler}
                >
                    <DeleteIcon/>
                </IconButton>

            </CardActions>
        </Card>
    );
}