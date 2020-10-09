import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";
import $ from "jquery";

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

export default function PosterViewInStock({ poster, renderStore }) {
    let history = useHistory();
    const [liked, setLiked] = React.useState(poster.likedItems);
    const handlePosterChangedSaved = () => {
        var data = {
            email: sessionStorage.getItem("userEmail"),
            posterId: poster.id,
            state: !liked,
        };

        if (liked && renderStore !== undefined) {
            renderStore(poster.id);
        } else {
            setLiked(!liked);
        }

        // Submit form via jQuery/AJAX
        $.ajax({
            type: "POST",
            url: "/get_liked_items",
            data: data,
        })
            .done(function(data) {})
            .fail(function(jqXhr) {});

        //here we need to update  the db (send a request to the server in order to update this user's product is saved )
    };

    const classes = useStyles();


    const { addingPoster, cartItems, increase } = useContext(CartContext);

    const isInCart = (poster) => {
        return !!cartItems.find((item) => item.id === poster.id);
    };

    function ViewPosterItemHandler(e) {
        //var self;
        e.preventDefault();
         history.push("/poster_edit");
    }
    return (
        <Card className={classes.root} onClick={ViewPosterItemHandler}>
            <CardHeader
                title={poster.name}
                subheader={poster.creator}
            />

            {poster !== undefined && poster.img !== undefined && (
                <CardMedia
                    className={classes.media}
                    image={poster.img}
                    title=""
                />
            )}
            <CardContent>
                title={poster.price}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={handlePosterChangedSaved}
                >
                    {!liked && <FavoriteBorderIcon />}
                    {liked && <FavoriteIcon />}
                </IconButton>

            </CardActions>
        </Card>
    );
}
