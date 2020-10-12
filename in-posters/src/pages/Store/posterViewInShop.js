import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import PosterImage from '../../components/posterImage';

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { useHistory } from "react-router-dom";
import $ from "jquery";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    flex:{
        display:'flex'
    },
    card: {
        padding:'24px 40px 40px'
    },
    subheading: {
        margin: '24px',
        color: theme.palette.openTitle
    },
    price: {
        padding: '16px',
        margin: '16px 0px',
        display: 'flex',
        backgroundColor: '#93c5ae3d',
        fontSize: '1.3em',
        color: '#375a53',
    },
    media: {
        height: 200,
        display: 'inline-block',
        width: '50%',
        marginLeft: '24px'
    },
    icon: {
        verticalAlign: 'sub'
    },
    link:{
        color: '#3e4c54b3',
        fontSize: '0.9em'
    },
    addCart: {
        width: '35px',
        height: '35px',
        padding: '10px 12px',
        borderRadius: '0.25em',
        backgroundColor: '#5f7c8b'
    },
    action: {
        margin: '8px 24px',
        display: 'inline-block'
    }
}));

export default function PosterViewInShop({ poster, renderStore }) {
    let history = useHistory();
    const [liked, setLiked] = React.useState(false);
    const handlePosterLiked = () => {
        var data = {
            email: sessionStorage.getItem("userEmail"),
            posterId: poster.id,
            state: !liked,
        };

        if (liked && renderStore !== undefined) {
            renderStore(poster);
        } else {
            setLiked(!liked);
        }

        // Submit form via jQuery/AJAX
        $.ajax({
            type: "POST",
            url: "/update_liked",
            data: data,
        })
            .done(function(data) {})
            .fail(function(jqXhr) {});

        //here we need to update  the db (send a request to the server in order to update this user's product is saved )
    };

    const classes = useStyles();

    function ViewPosterItemHandler(e) {
        //var self;
        e.preventDefault();
         history.push("/poster/"+poster._id);
    }
    return (

        <div className={classes.root}>
            <Grid container spacing={10}>
            <Grid item xs={7} sm={7}>
                    <Card className={classes.card}>
                        <CardHeader
                            title={poster.name}
                            subheader={poster.amount <= 0?'Out of Stock':null }
                        />
                        <div className={classes.flex}>
                            {poster !== undefined && poster.img !== undefined && (
                                <CardMedia
                                    className={classes.media}
                                    items={poster.img}
                                    title=""
                                />
                            )}
                            <Typography component="p" variant="subtitle1" className={classes.subheading}>
                                {poster.name}<br/>
                                <span className={classes.price}>$ {poster.price}</span>
                                <CardActions disableSpacing>
                                    <IconButton
                                        aria-label="add to favorites"
                                        onClick={handlePosterLiked}
                                    >
                                        {!liked && <FavoriteBorderIcon />}
                                        {liked && <FavoriteIcon />}
                                    </IconButton>
                                    <IconButton
                                        aria-label="preview"
                                        onClick={ViewPosterItemHandler}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </CardActions>
                            </Typography>

                        </div>
                    </Card>
                </Grid>
                {poster.tagList.length > 0 &&
                (<Grid item xs={5} sm={5}>
                    <List  items={poster.tagList} title='Tags'/>
                </Grid>)}
            </Grid>
        </div>);
}
